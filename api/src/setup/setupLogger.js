const winston = require('winston');
const HumioTransport = require('humio-winston');

const setupLogger = (config) => {
  const transports = [
    new winston.transports.Console({
      handleExceptions: true,
    }),
  ];
  if (process.env.NODE_ENV !== 'development') {
    // transports.push(
    //   new HumioTransport({
    //     ingestToken: config.humioToken,
    //     tags: {
    //       app: 'teamfindr-api',
    //     },
    //     handleExceptions: true,
    //   })
    // );
  }
  const logger = winston.createLogger({
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.splat(),
      winston.format.json()
    ),
    transports: transports,
  });

  return logger;
};

module.exports = setupLogger;
