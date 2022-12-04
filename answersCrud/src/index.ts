import * as mongoose from 'mongoose';
import { logger } from './utils/logger';
import { SeverityLevel } from './utils/severityLevel';
import { Server } from './server';
import { config } from './config';

((): void => {
  mongoose.connect(config.db.connectionString, {
    dbName: config.db.dbName,
  });

  mongoose.connection.on('connecting', () => {
    logger.log(SeverityLevel.Informational, '[MongoDB] connecting...');
  });

  mongoose.connection.on('connected', () => {
    logger.log(SeverityLevel.Informational, '[MongoDB] connected');
  });

  mongoose.connection.on('error', () => {
    logger.log(SeverityLevel.Error, '[MongoDB] error');
  });

  mongoose.connection.on('disconnected', () => {
    logger.log(SeverityLevel.Informational, '[MongoDB] disconnected');
  });

  Server.startServer();
})();
