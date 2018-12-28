const fs = require("fs");

const formatExtensionList = arr => {
  let [
    ,
    name,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    starRating,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    stars,
    userInstalls,
    ...rest
  ] = arr;
  userInstalls = Number(userInstalls.replace(/,/g, ""));
  return {
    name,
    starRating: Number(starRating).toFixed(2),
    stars,
    userInstalls,
    percentageOfUsersRatedApp: Number((stars / userInstalls) * 100).toFixed(2)
  };
};

const sortedExtensions = extensionList =>
  extensionList
    .map(item => formatExtensionList(item))
    .sort((a, b) => {
      if (b.userInstalls > a.userInstalls) return 1;
      if (b.userInstalls < a.userInstalls) return -1;
      if (b.stars > a.stars) return 1;
      if (b.stars < a.stars) return -1;
    });

const getChromeExtensionListFromFile = callback => {
  fs.readFile("./res.json", "utf8", (err, data) => {
    if (err) throw err;
    const res = JSON.parse(data);
    const sorted = sortedExtensions(res[1][1]);
    const chromeExtensions = JSON.stringify(sorted, "", 2);
    callback(chromeExtensions);
  });
};

const writeSortedExtensionsToFile = chromeExtensions => {
  fs.writeFile("./chrome-ext-sorted.json", chromeExtensions, err => {
    if (err) {
      console.error(err);
      return;
    } else {
      console.log("success! 🤖");
    }
  });
};

module.exports.sortChromeExtension = () =>
  new Promise((resolve, reject) => {
    try {
      getChromeExtensionListFromFile(extensions => {
        writeSortedExtensionsToFile(extensions);
        resolve(extensions);
      });
    } catch (err) {
      reject(err);
    }
  });
