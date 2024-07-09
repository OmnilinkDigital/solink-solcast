
import axios, { isAxiosError } from 'axios';
import { logger } from './logger.js';
import { AppDataSource } from './data-source.js';
import { Location } from './entity/Location.js';
import { ForecastData } from './entity/ForecastData.js';
// ----------------------------------------------------------------------
interface RadiationWeatherData {
  air_temp: number;
  ghi: number;
  dhi: number;
  dni: number;
  gti: number;
  period_end: Date,
  period: 'PT5M' | 'PT10M' | 'PT15M' | 'PT20M' | 'PT30M' | 'PT60M' //  ISO 8601 format
}
// ----------------------------------------------------------------------
interface RadiationWeatherResponse { estimated_actuals: RadiationWeatherData[] }
// ----------------------------------------------------------------------
interface GetLocationOptions {
  internal_id: string;
}
// ----------------------------------------------------------------------
const getLocation = async ({ internal_id }: GetLocationOptions) => {
  try {
    const location = await AppDataSource.manager.findOne(Location, {
      where: { internal_id }
    });
    return location;
  } catch (error) {
    logger.error('An error occurred while fetching location', error);
    return null;
  }
}
// ----------------------------------------------------------------------
interface GetDataOptions {
  latitude: number;
  longitude: number;
}
// ----------------------------------------------------------------------
const getData = async ({ latitude, longitude }: GetDataOptions) => {
  try {
    const { status, data } = await axios.get<RadiationWeatherResponse>(`${process.env.SOLCAST_API_URL}/data/live/radiation_and_weather`, {
      headers: {
        Authorization: `Bearer ${process.env.SOLCAST_API_KEY}`,
        Accept: 'application/json',
      },
      params: {
        latitude,
        longitude,
        output_parameters: 'air_temp,ghi,dhi,dni,gti', // We're only interested in these parameters for now
        format: 'json',
      }
    });
    if (status !== 200) {
      logger.error('An error occurred while fetching data', status);
      throw new Error('An error occurred while fetching data');
    }
    return data.estimated_actuals;
  } catch (error) {
    if (isAxiosError(error)) {
      logger.error('An error occurred while fetching data', error);
    }
    logger.error('An error occurred while fetching data', error);
  }
}
// ----------------------------------------------------------------------
export const processData = async () => {
  /**
   * This is a demonstration of how to get data from an external API.
   * For the purpose of this demonstration, we only fetching a hardcoded location.
   * In a real-world scenario, you would have a list of locations to fetch data for.
   */
  const location = await getLocation({ internal_id: 'sydney-opera-house' });
  const data = await getData({ latitude: location.latitude, longitude: location.longitude });

  for (const entry of data) {

    // We're using the upsert method to insert or update the data if it already exists
    const result = await AppDataSource.manager.upsert(ForecastData, {
      location,
      period_end: entry.period_end,
      period: entry.period,
      air_temp: entry.air_temp,
      ghi: entry.ghi,
      dhi: entry.dhi,
      dni: entry.dni,
      gti: entry.gti
    }, ['period_end', 'location', 'period']);

    // Log the result
    if (result.generatedMaps.length > 0) {
      logger.info('Data inserted successfully', {
        location: location.name,
        period_end: entry.period_end,
        period: entry.period
      });
    } else {
      logger.error('An error occurred while inserting', {
        location: location.name,
        period_end: entry.period_end,
        period: entry.period
      });
    }

  }
}