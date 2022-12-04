import axios from 'axios';
import { config } from '../../config';
import {
  ISurveyQuestions,
  IQuestion,
} from '../../compositor/interfaces/interfaces';
import { logger } from '../logger';
import { SeverityLevel } from '../severityLevel';

export default class QuestionsService {
  static api = config.questionsService.questionsCrudConnectionString;

  static async getQuestionSurvey(
    headers: any,
    surveyId: string
  ): Promise<ISurveyQuestions | null> {
    const surveyQuestion = await axios
      .get(`${QuestionsService.api}/getSurveyById?id=${surveyId}`, {
        headers,
      })
      .then((res) => res.data)
      .catch((err) => {
        logger.log(SeverityLevel.Error, err.message);
        return null;
      });

    return surveyQuestion;
  }

  static async deleteQuestionSurvey(
    headers: any,
    surveyId: string
  ): Promise<ISurveyQuestions | null> {
    const surveyQuestion = await axios
      .delete(`${QuestionsService.api}/deleteSurveyById?id=${surveyId}`, {
        headers,
      })
      .then((res) => res.data)
      .catch((err) => {
        logger.log(SeverityLevel.Error, err.message);
        return null;
      });

    return surveyQuestion;
  }

  static async createQuestionSurvey(
    headers: any,
    surveyName: string,
    creatorId: string,
    questionsContent: Array<IQuestion>
  ): Promise<ISurveyQuestions | null> {
    console.log(`${QuestionsService.api}/createSurvey`);
    const surveyQuestions = await axios
      .post(
        `${QuestionsService.api}/createSurvey`,
        { creatorId, surveyName, questionsContent } as ISurveyQuestions,
        {
          headers,
        }
      )
      .then((res) => res.data)
      .catch((err) => {
        logger.log(SeverityLevel.Error, err.message);
        return null;
      });

    return surveyQuestions;
  }
}
