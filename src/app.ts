import { Hono } from 'hono'
import { AppDataSource } from './data-source.js';
import { job } from './jobs.js';

// ----------------------------------------------------------------------
/**
 * This is just a simple server that returns a JSON response with the status of the server.
 * In a real-world application, you would have more endpoints to handle different requests.
 * But for the purpose of this demonstration, we only need this one endpoint.
 */
// ----------------------------------------------------------------------
const app = new Hono();
// ----------------------------------------------------------------------
/**
 * This is a simple endpoint to check if the server is alive and can serve as a health check endpoint.
 * We're not doing any database operations here, so we don't need to worry about the database connection.
 */
app.get('/alive', async (c) => {
  return c.json({
    alive: true,
    database_initialized: AppDataSource.isInitialized,
    job_running: job.context.running,
    job_last_run: job.context.lastDate(),
    job_next_run: job.context.nextDates(1).pop(),
  })
})
// ----------------------------------------------------------------------
export { app };