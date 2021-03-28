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
  const everyDay = "0 0 0 * *";
  const everyTenMinutes = "*/6 * * * *";

  let expression, envStr;
  switch (process.env.NODE_ENV) {
    case "production":
      expression = everyDay;
      envStr = `NODE_ENV=${process.env.NODE_ENV}`;
      break;

    case "development":
      expression = everyTenMinutes;
      envStr = `NODE_ENV=${process.env.NODE_ENV}`;
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
