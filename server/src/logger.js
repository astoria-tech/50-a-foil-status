require("dotenv").config();
const winston = require("winston");
const SlackHook = require("winston-slack-webhook-transport");

const transports = {
  console: new winston.transports.Console({
    format: winston.format.simple(),
  }),
  slack: new SlackHook({
    level: "error",
    format: winston.format.simple(),
    webhookUrl: process.env.SLACK_WEBHOOK_URL,
  }),
};

const logger = winston.createLogger({
  transports: [transports.console],
});

logger.stream = {
  format: winston.format.simple(),
  write: (message) => {
    logger.dev(message);
  },
};

if (process.env.NODE_ENV === "production") {
  logger.add(transports.slack);
  logger.remove(transports.console);
}

module.exports = logger;
