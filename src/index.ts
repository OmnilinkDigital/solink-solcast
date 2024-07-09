import { app } from "./app.js";
import { AppDataSource, bootstrap } from "./data-source.js";
import { serve } from '@hono/node-server';
import { job } from "./jobs.js";
import { logger } from "./logger.js";

/**
 * For the purpose of this demonstration, we're not going to validate any environment variables.
 * In a real-world application, you would have to validate the environment variables before using them.
 */
// ----------------------------------------------------------------------
const PORT = process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 3000;
// ----------------------------------------------------------------------
AppDataSource.initialize().then(async (value) => {

  // Check if the database is initialized
  if (value.isInitialized) {
    logger.info('Database initialized successfully');

    // Bootstrap the application
    await bootstrap();

    // Start web the server
    logger.info('Starting the server');
    serve({ fetch: app.fetch, port: PORT });

    // Start the cron job
    logger.info('Starting the cron job');
    job.start();

    // Log that the server has started
    logger.info('Server started successfully');

  } else {
    logger.error('An error occurred while initializing the database');
  }

}).catch(error => logger.error('An error occurred while starting the server', error));
// ----------------------------------------------------------------------