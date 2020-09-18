const cron = require("node-cron");
const createDatastore = require("../createDatastore/");

const initUpdateCronJob = async () => {
  const cronConfig = setCronConfig();
  const logStatement = `cron job with interval "${cronConfig.expression}" for: ${cronConfig.envStr}`;

  console.log(`Scheduling ${logStatement}`);

  cron.schedule(cronConfig.expression, async () => {
    console.log(`Running ${logStatement} ...`);
    await createDatastore();
  });
};

const setCronConfig = () => {
  const everyHour = "0 * * * *";
  const everyFifteenMinutes = "*/15 * * * *";
  const everyOtherMinute = "*/2 * * * *";

  let expression, envStr;
  switch (process.env.NODE_ENV) {
    case "production":
      expression = everyHour;
      envStr = `NODE_ENV=${process.env.NODE_ENV}; DATA_LEVEL=${process.env.DATA_LEVEL}`;
      break;

    case "development":
      expression = process.env.DATA_LEVEL === "low" ? everyOtherMinute : everyFifteenMinutes;
      envStr = `NODE_ENV=${process.env.NODE_ENV}; DATA_LEVEL=${process.env.DATA_LEVEL}`;
      break;

    default:
      console.log("Hit unused default in `setCronExpr()`. This means something is wrong.");
      break;
  }

  return {
    expression,
    envStr,
  };
};

module.exports = initUpdateCronJob;
