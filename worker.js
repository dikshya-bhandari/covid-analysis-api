const cron = require("node-cron");
const covidDataFetchJobs = require("./jobs/covidDataFetch");

// every minute -> "* * * * *"
// const interval = "* * * * *";
// every day -> "0 0 * * *"

const interval = "* * * * *";

cron.schedule(interval, () => {
  covidDataFetchJobs();
});
