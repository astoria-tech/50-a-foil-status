const cron = require("node-cron");

const initUpdateCronJob = () => {
  const everyHour = "0 * * * *";
  const everyOtherMinute = "*/2 * * * *";

  const cronExpr = process.env.NODE_ENV === "production" ? everyHour : everyOtherMinute;

  console.log(`Cron job initiated for internal "${cronExpr}" for NODE_ENV ${process.env.NODE_ENV}`);

  cron.schedule(cronExpr, () => {
    console.log("Running cron job...");
    require("../updateDatastore/");
  });
};

module.exports = initUpdateCronJob;
