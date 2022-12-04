/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as express from 'express';
import * as http from 'http';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import { errorMiddleware } from './utils/errors/errorHandler';
import { logger } from './utils/logger';
import { SeverityLevel } from './utils/severityLevel';
import { config } from './config';
import { AppRouter } from './router';

export class Server {
  public app: express.Application;

  private server: http.Server;

  public static startServer(): Server {
    return new Server();
  }

  public closeServer(): void {
    this.server.close();
  }

  private constructor() {
    this.app = express();
    this.configurationMiddleware();
    this.app.use(AppRouter);
    this.app.use(errorMiddleware);
    this.server = this.app.listen(config.server.port, () => {
      logger.log(
        SeverityLevel.Informational,
        `${config.server.name} listening on port ${config.server.port}`
      );
    });
  }

  private setHeaders = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    );
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Authorization, Origin, X-Requested-With, Content-Type'
    );

    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    return next();
  };

  private configurationMiddleware() {
    this.app.use(morgan('dev'));
    this.app.use(this.setHeaders);
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }
}
