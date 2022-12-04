import axios from 'axios';
import { config } from '../../config';
import { ISurveyAnswers } from '../../compositor/interfaces/interfaces';
import { logger } from '../logger';
import { SeverityLevel } from '../severityLevel';

export default class AnswersService {
  static api = config.answersService.answersCrudConnectionString;

  static async getAnswer(
    headers: any,
    surveyId: string
  ): Promise<ISurveyAnswers | null> {
    const surveyAnswers = await axios
      .get(`${AnswersService.api}/getSurveysById?surveyId=${surveyId}`, {
        headers,
      })
      .then((res) => res.data)
      .catch((err) => {
        logger.log(SeverityLevel.Error, err.message);
        return null;
      });

    return surveyAnswers;
  }

  static async deleteAnswer(
    headers: any,
    surveyId: string
  ): Promise<ISurveyAnswers | null> {
    const surveyAnswers = await axios
      .delete(`${AnswersService.api}/delete?surveyId=${surveyId}`, {
        headers,
      })
      .then((res) => res.data)
      .catch((err) => {
        logger.log(SeverityLevel.Error, err.message);
        return null;
      });

    return surveyAnswers;
  }

  static async createAnswersSurvey(
    headers: any,
    newSurvey: ISurveyAnswers
  ): Promise<ISurveyAnswers | null> {
    const surveyAnswers = await axios
      .post(`${AnswersService.api}`, newSurvey, {
        headers,
      })
      .then((res) => res.data)
      .catch((err) => {
        logger.log(SeverityLevel.Error, err.message);
        return null;
      });

    return surveyAnswers;
  }
}
