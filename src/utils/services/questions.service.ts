import axios from 'axios';
import { config } from '../../config';
import { ISurveyQuestions } from '../../compositor/interfaces/compositor.interface';

export default class QuestionsService {
  static api = `${config.questionsService.questionsCrudConnectionString}/api/questions`;

  static async getQuestion(
    headers: any,
    surveyId: string
  ): Promise<ISurveyQuestions | null> {
    return axios
      .get(
        `${config.questionsService.questionsCrudConnectionString}/api/questions/getSurveyById`,
        { params: { id: surveyId }, headers }
      )
      .then((res) => res.data);
  }

  static async deleteQuestion(
    headers: any,
    surveyId: string
  ): Promise<ISurveyQuestions | null> {
    return axios
      .delete(
        `${config.questionsService.questionsCrudConnectionString}/api/questions/deleteSurveyById`,
        { params: { id: surveyId }, headers }
      )
      .then((res) => res.data);
  }
}
