import puppeteer from "puppeteer";

const url = "https://careers.google.com/jobs/results/?distance=50&hl=en_US&jlo=en_US&q=";
async function googleScrapper(positionFilter, locationFilter) {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: "networkidle0" });
        page.screenshot({ path: "amazing.png" });

        const jobs = [];
        var page_num = 1;

        do {
            const curr_jobs = await page.$$eval(
                ".gc-card",
                (a_tags, positionFilter) => {
                    return a_tags.map((job) => {
                        const url = job.href;
                        const location =
                            job.querySelector("span[itemprop=addressCountry]") === null
                                ? " "
                                : job.querySelector("span[itemprop=addressCountry]").innerText;
                        const position = job.ariaLabel;
                        var flag = false;
                        positionFilter.map((currPosition) => {
                            if (position.toLowerCase().match(currPosition.toLocaleLowerCase())) flag = true;
                        });
                        if (flag === true) return { Position: position, Location: location, Url: url };
                    });
                },
                positionFilter
            );
            // const a_tags = Array.from(document.querySelectorAll(".gc-card"));
            // a_tags.map((job) => {
            //     const url = job.href;
            //     const location = job.querySelector("span[itemprop=addressCountry]").innerText;
            //     const position = job.ariaLabel;
            //     return { Position: position, Location: location, Url: url };
            // });
            jobs.push(...curr_jobs);

            page_num++;
            await page.goto(`https://careers.google.com/jobs/results/?distance=50&hl=en_US&jlo=en_US&page=${page_num}&q=`, {
                waitUntil: "networkidle0",
            });
        } while (page_num <= 10);

        for (const job of jobs) if (job != null) console.log(job);
        await browser.close();
    } catch (e) {
        console.log(e);
    }

    // const jobs = googleAPIRes.data.jobs;
    // const result = jobs.map((job) => {
    //     return {
    //         id: job.id,
    //         name: job.title,
    //         url: job.apply_url,
    //         jd: `${job.responsibilities}\n${job.qualifications}\n${job.description}`,
    //         location: "india",
    //         // companyName: name,
    //     };
    // });

    // console.log(result);
}

export default googleScrapper;
