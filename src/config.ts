import * as dotenv from 'dotenv';
import * as env from 'env-var';

dotenv.config();

export const config = {
  server: {
    name: 'Compositor',
    port: env.get('APPLICATION_PORT').default(3003).asPortNumber(),
  },
  db: {
    connectionString: env
      .get('DB_CONNECTION_URL')
      .default('mongodb://mongo:27017')
      .asString(),
    dbName: env.get('compositor_DB_NAME').default('compositor').asString(),
  },
  answersService: {
    answersCrudConnectionString: env
      .get('ANSWERS_CRUD_CONNECTION_URL')
      .default('http://localhost:3001')
      .asString(),
    serviceName: env
      .get('ANSWERS_SERVICE_NAME')
      .default('answers-crud-service')
      .asString(),
  },
  questionsService: {
    questionsCrudConnectionString: env
      .get('QUESTIONS_CRUD_CONNECTION_URL')
      .default('http://localhost:3002')
      .asString(),
    serviceName: env
      .get('QUESTIONS_SERVICE_NAME')
      .default('questions-crud-service')
      .asString(),
  },
};

// questionsCrud Port: 3002;
// answersCrud Port: 3001;
// compositor Port: 3003;
