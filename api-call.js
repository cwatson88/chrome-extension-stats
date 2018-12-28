const fs = require("fs");
var request = require("request");

var options = {
  method: "POST",
  url: "https://chrome.google.com/webstore/ajax/item",
  qs: {
    hl: "en-GB",
    gl: "GB",
    pv: "20181009",
    mce:
      "atf,pii,rtr,rlb,gtc,hcn,svp,wtd,nrp,hap,nma,nsp,dpb,c3d,ncr,ctm,ac,hot,mac,fcf,rma",
    count: "209",
    category: "extensions",
    searchTerm: "bookmarks",
    sortBy: "0",
    container: "CHROME"
  },
  headers: {
    "cache-control": "no-cache",
    "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
    Accept: "*/*",
    "accept-language": "en-GB,en-US;q=0.9,en;q=0.8"
  },
  form: {}
};

module.exports.getExtensions = () => new Promise((resolve, reject) => {
  try {
    request(options, function(error, response, body) {
      if (error) throw new Error(error);

      const result = body
        .toString()
        .substring(4)
        .trim();

      fs.writeFile("./res.json", result, err => {
        if (err) {
          console.error(err);
          return;
        } else {
          console.log("success! 👾");
          resolve()
        }
      });
    });
  } catch (err) {
    reject(err);
  }
});
