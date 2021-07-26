import express from 'express';
import http from 'http';
import { createTerminus } from '@godaddy/terminus';
import config from './config';
import routes from './routes';
import logger from './logger';
import cors from './middlewares/cors';
import responseTime from './middlewares/responseTime';
import mongoose from 'mongoose';

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('trust proxy', true);
app.use(cors);

if (process.env.ENV === 'DEVELOPMENT') {
  app.use(responseTime);
}

app.use(routes);

async function onSignal(): Promise<void> {
  logger.warn('Server is going to shut down! Starting cleanup...');
}

async function onShutdown (): Promise<void> {
  logger.warn('Server is shuting down!');
}

async function onHealthCheck(): Promise<void> {
  return;
}

createTerminus(server, {
  healthChecks: {
    '/health/liveness': onHealthCheck,
  },
  onSignal,
  onShutdown,
});

async function start(): Promise<void> {
  mongoose.connect(config.database.connection.url, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true, tlsInsecure: true, useCreateIndex: true, });
  mongoose.connection.on('error', (error) => {
    logger.error('Mongoose has problems with the connection!', error);
    console.error(error);
  });
  mongoose.connection.once('open', () => {
    logger.info('Connected to MongoDB!');
  });

  try {
    server.listen(config.port, () => {
      logger.info(`Server started at http://localhost:${ config.port }`);
    });
  } catch(error) {
    console.error({ message: 'Unable to start server!', error });
    console.log(error);
    process.exit(1);
  }
}

start();
