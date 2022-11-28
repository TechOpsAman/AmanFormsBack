import axios from 'axios';
import { config } from '../../config';
import {
  ISurveyAnswers,
  ISurveyQuestions,
  IQuestion,
} from '../../compositor/interfaces/compositor.interface';

export default class CompositorService {
  static answersServiceAPI = `${config.answersService.answersCrudConnectionString}/api/answers`;

  static questionsServiceAPI = `${config.questionsService.questionsCrudConnectionString}/api/questions`;

  static createSurvey = async (
    // TODO: ask if to keep this function here ot move it.
    headers: any,
    surveyName: string,
    creatorId: string,
    content: Array<IQuestion>,
    newSurvey: Omit<ISurveyAnswers, 'surveyId'>
  ): Promise<(ISurveyQuestions | ISurveyAnswers)[] | null> => {
    const surveyQuestions: ISurveyQuestions | null = await axios
      .post(
        `${CompositorService.questionsServiceAPI}`,
        { surveyName: surveyName, creatorId: creatorId, content: content },
        headers
      )
      .then((res) => res.data);

    if (!surveyQuestions) return null;

    const newSurveyAnswers: ISurveyAnswers = {
      surveyId: (surveyQuestions as ISurveyQuestions).id!,
      ...newSurvey,
    };

    const surveyAnswers: ISurveyAnswers | null = await axios
      .post(
        `${CompositorService.answersServiceAPI}`,
        { newSurveyAnswers },
        headers
      )
      .then((res) => res.data);

    if (!surveyAnswers) return null;

    return [
      surveyQuestions as ISurveyQuestions,
      surveyAnswers as ISurveyAnswers,
    ];
  };
}
