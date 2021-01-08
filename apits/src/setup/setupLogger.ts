import winston from 'winston';
import HumioTransport from 'humio-winston';
import Transport from 'winston-transport';
import { Config } from '../types';

const setupLogger = (config: Config) => {
  const transports: Transport[] = [
    new winston.transports.Console({
      handleExceptions: true,
    }),
  ];
  if (process.env.NODE_ENV !== 'development') {
    transports.push(
      new HumioTransport({
        ingestToken: config.humioToken,
        tags: {
          app: 'teamfindr-api',
        },
        handleExceptions: true,
      })
    );
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

export default setupLogger;
