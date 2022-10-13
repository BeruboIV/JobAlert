// const axios = require("axios");
// const cheerio = require("cheerio");
import puppeteer from "puppeteer";

const url = "https://www.atlassian.com/company/careers/all-jobs";

async function atlassianScrapper(positions, locations) {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: "networkidle0" });

        const jobs = await page.evaluate((positions) => {
            const jobInfo = document.querySelectorAll("td");
            arr = [];
            for (var i = 0; i < jobInfo.length; i += 2) {
                var flag = false;
                console.log("Working here");
                positions.map((currPosition) => {
                    if (jobInfo[i].firstChild.textContent.toLocaleLowerCase().match(currPosition.toLocaleLowerCase())) {
                        flag = true;
                    }
                });

                if (flag === true) arr.push({ Position: jobInfo[i].firstChild.textContent, Location: jobInfo[i + 1].textContent });
            }
            return arr;
        }, positions);
        console.log(jobs);
        await browser.close();
    } catch (e) {
        console.log(e);
    }
}

export default atlassianScrapper;
