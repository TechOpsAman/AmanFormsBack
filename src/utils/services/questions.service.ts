import axios from 'axios';
import { config } from '../../config';
import { ISurveyQuestions } from '../../compositor/interfaces/compositor.interface';

export default class QuestionsService {
  static api = `${config.questionsService.questionsCrudConnectionString}/api/questions`;

  static async getQuestionSurvey(
    headers: any,
    surveyId: string
  ): Promise<ISurveyQuestions | null> {
    return axios
      .get(`${QuestionsService.api}/getSurveyById?id=${surveyId}`, {
        headers,
      })
      .then((res) => res.data);
  }

  static async deleteQuestionSurvey(
    headers: any,
    surveyId: string
  ): Promise<ISurveyQuestions | null> {
    return axios
      .delete(`${QuestionsService.api}/deleteSurveyById?id=${surveyId}`, {
        headers,
      })
      .then((res) => res.data);
  }
}
