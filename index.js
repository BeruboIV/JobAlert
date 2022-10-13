import { position, location } from "./filters/filters.js";
import atlassianScrapper from "./utils/atlassian.js";
import googleScrapper from "./utils/google.js";

(async () => {
    // await atlassianScrapper(position, location);
    await googleScrapper(position, location);
})();
