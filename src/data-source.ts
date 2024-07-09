import "reflect-metadata"
import { DataSource } from "typeorm"
import { ForecastData } from "./entity/ForecastData.js";
import { Location } from "./entity/Location.js";
import { logger } from "./logger.js";

// ----------------------------------------------------------------------
export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: true,
  logging: false,
  entities: [Location, ForecastData],
  migrations: [],
  subscribers: [],
})
// ----------------------------------------------------------------------
export const generateDefaultData = async () => {
  const location = new Location();
  location.name = 'Sydney Opera House';
  location.latitude = -33.856784;
  location.longitude = 151.215297;
  location.resource_id = 'ba75-e17a-7374-95ed';
  location.internal_id = 'sydney-opera-house';
  await AppDataSource.manager.save(location);
}
// ----------------------------------------------------------------------
export const bootstrap = async () => {
  const count = await AppDataSource.manager.count(Location);
  if (count === 0) {
    logger.info('Generating default data');
    await generateDefaultData();
  } else {
    logger.info('Default data already exists');
  }
}
// ----------------------------------------------------------------------