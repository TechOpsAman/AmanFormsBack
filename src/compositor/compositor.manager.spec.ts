import axios from 'axios';
import * as mongoose from 'mongoose';
import { config } from '../config';
/* eslint-disable @typescript-eslint/naming-convention */
import { CompositorManager } from './compositor.manager';
import {
  ISurveyAnswers,
  ISurveyQuestions,
  IQuestion,
} from './interfaces/compositor.interface';

const {
  db: { connectionString, dbName },
} = config;

const answersServiceAPI = `${config.answersService.answersCrudConnectionString}/api/answers`;
const questionsServiceAPI = `${config.questionsService.questionsCrudConnectionString}/api/questions`;

const createSurvey = async (
  // TODO: ask if to keep this function here ot move it.
  headers: any,
  surveyName: string,
  creatorId: string,
  content: Array<IQuestion>,
  newSurvey: ISurveyAnswers
): Promise<(ISurveyQuestions | ISurveyAnswers)[]> => {
  const surveyQuestions = await axios
    .post(
      `${questionsServiceAPI}`,
      { surveyName: surveyName, creatorId: creatorId, content: content },
      headers
    )
    .then((res) => res.data);
  const surveyAnswers = await axios
    .post(`${answersServiceAPI}`, newSurvey, headers)
    .then((res) => res.data);
  return [surveyQuestions, surveyAnswers];
};

describe('Compositor Manager Module', () => {
  beforeAll(async () => {
    await mongoose.connect(connectionString, { dbName });
    await mongoose.connection.dropDatabase();
  });

  afterEach(async () => {
    await mongoose.connection.db.dropDatabase();
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  describe('Delete a survey', () => {
    test('Should create a survey', async () => {
      const createdSurvey = await createSurvey(
        {},
        validSurveyName1,
        validCreatorId,
        validContent1 as IQuestion[],
        validSurvey1
      );

      if (!createdSurvey) {
        fail();
      }

      const survey = await QuestionManager.deleteSurveyById(createdSurvey.id);
      expect(createdSurvey.id).toEqual(survey?.id);
    });

    test('Should throw survey not found error', async () => {
      try {
        await QuestionManager.deleteSurveyById(invalidSurveyId);
      } catch (err) {
        expect(err).toBeInstanceOf(SurveyNotFoundError);
      }
    });
  });
});
