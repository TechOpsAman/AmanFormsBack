import * as dotenv from 'dotenv';
import * as env from 'env-var';

dotenv.config();

export const config = {
  server: {
    name: 'Questions-crud',
    port: env.get('APPLICATION_PORT').default(3002).asPortNumber(),
  },
  db: {
    connectionString: env
      .get('DB_CONNECTION_URL')
      .default('mongodb://localhost:27017')
      .asString(),
    dbName: env.get('QUESTION_DB_NAME').default('questions-crud').asString(),
  },
};
