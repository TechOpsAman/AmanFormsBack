import * as dotenv from 'dotenv';
import * as env from 'env-var';

dotenv.config();

export const config = {
  server: {
    name: 'Compositor',
    port: env.get('APPLICATION_PORT').default(3003).asPortNumber(),
  },
  answersService: {
    answersCrudConnectionString: env
      .get('ANSWERS_CRUD_CONNECTION_URL')
      .default('http://answers-service:3001')
      .asString(),
    serviceName: env
      .get('ANSWERS_SERVICE_NAME')
      .default('answers-crud-service')
      .asString(),
  },
  questionsService: {
    questionsCrudConnectionString: env
      .get('QUESTIONS_CRUD_CONNECTION_URL')
      .default('http://questions-service:3002')
      .asString(),
    serviceName: env
      .get('QUESTIONS_SERVICE_NAME')
      .default('questions-crud-service')
      .asString(),
  },
};
