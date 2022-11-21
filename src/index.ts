// import * as mongoose from 'mongoose';
// import { logger } from './utils/logger';
// import { SeverityLevel } from './utils/severityLevel';
import { Server } from './server';
// import { config } from './config';

((): void => {
  Server.startServer();
})();
