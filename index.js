const puppeteer = require("puppeteer");
const { getExtensions } = require("./api-call");
const { sortChromeExtension } = require("./list-all-extension");

const openInTable = async (extensionList) => {
    const extensions =  await extensionList
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('http://json2table.com');

    await page.$eval('#json_vl', (el, value) => el.value = value, extensions)
    await page.click('#load_json_btn')
    await page.click('#treeViewMenu')
    
    // await browser.close();
}

getExtensions()
  .then(() => sortChromeExtension())
  .then(res => openInTable(res));