const cron = require("node-cron");

const initUpdateCronJob = () => {
  const everyHour = "0 * * * *";
  const everyOtherMinute = "*/2 * * * *";

  const cronExpr = process.env.NODE_ENV === "production" ? everyHour : everyOtherMinute;

  console.log(cronExpr);

  cron.schedule(cronExpr, () => {
    console.log("running a task every minute");
    require("../updateDatastore/");
  });
};

module.exports = initUpdateCronJob;
