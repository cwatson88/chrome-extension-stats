const clear = require("clear");
const puppeteer = require("puppeteer");

const { getExtensions } = require("./api-call");
const { sortChromeExtension } = require("./list-all-extension");
const { logo } = require("./logo");
const { search } = require("./search-prompt");

logo();

const openInTable = async extensionList => {
  const extensions = await extensionList;
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("http://json2table.com");

  await page.$eval("#json_vl", (el, value) => (el.value = value), extensions);
  await page.click("#load_json_btn");
  await page.click("#treeViewMenu");

  // await browser.close();
};

search()
  .then(searchTerm => getExtensions(searchTerm))
  .then(() => sortChromeExtension())
  .then(res => openInTable(res))
