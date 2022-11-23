import axios from 'axios';
import { config } from '../../config';
import { ISurveyQuestions } from '../../compositor/interfaces/compositor.interface';

export default class QuestionsService {
  static api = `${config.questionsService.questionsCrudConnectionString}/api/questions`;

  static async getQuestionSurvey(
    headers: any,
    surveyId: string
  ): Promise<ISurveyQuestions | null> {
    const surveyQuestion = axios
      .get(`${QuestionsService.api}/getSurveyById?id=${surveyId}`, {
        headers,
      })
      .then((res) => res.data)
      .catch((err) => {
        console.log(err);
        return null;
      });

    return surveyQuestion;
  }

  static async deleteQuestionSurvey(
    headers: any,
    surveyId: string
  ): Promise<ISurveyQuestions | null> {
    const surveyQuestion = axios
      .delete(`${QuestionsService.api}/deleteSurveyById?id=${surveyId}`, {
        headers,
      })
      .then((res) => res.data)
      .catch((err) => {
        console.log(err);
        return null;
      });

    return surveyQuestion;
  }
}
