import axios from 'axios';
import { config } from '../../config';
import { ISurveyAnswers } from '../../compositor/interfaces/compositor.interface';

export default class AnswersService {
  static api = `${config.answersService.answersCrudConnectionString}/api/answers`;

  static async getAnswer(
    headers: any,
    surveyId: string
  ): Promise<ISurveyAnswers | null> {
    return axios
      .get(
        `${config.questionsService.questionsCrudConnectionString}/api/answers/find/${surveyId}`,
        headers
      )
      .then((res) => res.data);
  }

  static async deleteAnswer(
    headers: any,
    surveyId: string
  ): Promise<ISurveyAnswers | null> {
    return axios
      .delete(
        `${config.questionsService.questionsCrudConnectionString}/api/answers/deleteSurveyById/${surveyId}`,
        headers
      )
      .then((res) => res.data);
  }
}
