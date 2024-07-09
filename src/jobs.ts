import { CronJob } from 'cron';
import { logger } from './logger.js';
import { processData } from './get-data.js';
// ----------------------------------------------------------------------
const getHourlyRadiationAndWeather = () => {
  const job = new CronJob('0 * * * *', async () => {
    logger.info('Fetching hourly radiation and weather data');
    try {
      await processData();
      logger.info('Hourly radiation and weather data fetched successfully');
    } catch (error) {
      logger.error('An error occurred while fetching hourly radiation and weather data', error);
    }
    return null;
  }, () => {
    logger.info('Hourly radiation and weather data fetched successfully');
  }, false, 'Africa/Johannesburg');
  return job;
}
// ----------------------------------------------------------------------
export const job = getHourlyRadiationAndWeather();
// ----------------------------------------------------------------------