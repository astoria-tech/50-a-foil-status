const cron = require("node-cron");
const populateFoia = require("../populateFoia/");

const initUpdateCronJob = async () => {
  const cronConfig = setCronConfig();
  const logStatement = `cron job with interval "${cronConfig.expression}" for: ${cronConfig.envStr}`;

  console.log(`Scheduling ${logStatement}`);

  cron.schedule(cronConfig.expression, async () => {
    console.log(`Running ${logStatement} ...`);
    await populateFoia();
  });
};

const setCronConfig = () => {
  const everyHour = "0 * * * *";
  const everyThirtyMinutes = "*/30 * * * *";
  const everyOtherMinute = "*/2 * * * *";

  let expression, envStr;
  switch (process.env.NODE_ENV) {
    case "production":
      expression = everyHour;
      envStr = `NODE_ENV=${process.env.NODE_ENV}; DATA_LEVEL=${process.env.DATA_LEVEL}`;
      break;

    case "development":
      expression = process.env.DATA_LEVEL === "low" ? everyOtherMinute : everyThirtyMinutes;
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
