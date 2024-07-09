import winston from 'winston';
// ----------------------------------------------------------------------
export const logger = winston.createLogger({
  format: winston.format.json(),
  defaultMeta: { service: 'soling-solcast' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error', dirname: 'logs' }),
    new winston.transports.File({ filename: 'combined.log', dirname: 'logs' }),
    ...(process.env.NODE_ENV !== 'production' ? [new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
      ),
    })] : []),
  ],
});
// ----------------------------------------------------------------------