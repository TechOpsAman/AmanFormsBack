import axios from 'axios';
import { config } from '../../config';
import { ISurveyAnswers } from '../../compositor/interfaces/compositor.interface';

export default class AnswersService {
  static api = `${config.answersService.answersCrudConnectionString}/api/answers`;

  static async getAnswer(
    headers: any,
    surveyId: string
  ): Promise<ISurveyAnswers | null> {
    const surveyAnswers = await axios
      .get(`${AnswersService.api}/find?surveyId=${surveyId}`, {
        headers,
      })
      .then((res) => res.data)
      .catch((err) => {
        console.log(err);
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
        console.log(err);
        return null;
      });

    return surveyAnswers;
  }

  static async createAnswersSurvey(
    headers: any,
    newSurvey: ISurveyAnswers
  ): Promise<ISurveyAnswers | null> {
    const surveyAnswers = await axios
      .post(`${AnswersService.api}/`, newSurvey, {
        headers,
      })
      .then((res) => res.data)
      .catch((err) => {
        console.log('The error is: ' + err);
        return null;
      });

    console.log('CreateAnswersSurveyService: ' + surveyAnswers);

    return surveyAnswers;
  }
}
