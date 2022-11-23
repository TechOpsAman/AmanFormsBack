import axios from 'axios';
import { config } from '../../config';
import { ISurveyAnswers } from '../../compositor/interfaces/compositor.interface';

export default class AnswersService {
  static api = `${config.answersService.answersCrudConnectionString}/api/answers`;

  static async getAnswer(
    headers: any,
    surveyId: string
  ): Promise<ISurveyAnswers | null> {
    const answer = axios
      .get(
        `${config.questionsService.questionsCrudConnectionString}/api/answers/find`,
        {
          params: {
            surveyId: surveyId,
          },
          headers,
        }
      )
      .then((res) => res.data);

    console.log(answer);

    return answer;
  }

  static async deleteAnswer(
    headers: any,
    surveyId: string
  ): Promise<ISurveyAnswers | null> {
    const answer = axios
      .delete(
        `${config.questionsService.questionsCrudConnectionString}/api/answers/deleteSurveyById`,
        { params: { surveyId: surveyId }, headers }
      )
      .then((res) => res.data);

    console.log(answer);

    return answer;
  }
}
