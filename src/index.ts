// import * as mongoose from 'mongoose';
// import { logger } from './utils/logger';
// import { SeverityLevel } from './utils/severityLevel';
import { Server } from './server';
// import { config } from './config';

((): void => {
  // TODO: Change to Server connection and maybe check if answers
  // and questions services are up and user logger accordingly!!!
  Server.startServer();
})();
