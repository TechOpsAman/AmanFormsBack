/* eslint-disable @typescript-eslint/no-unused-vars */
import { ISurveyQuestions, ISurveyAnswers } from "./interfaces/interfaces";
import {
  SurveyAnswersNotFoundError,
  SurveyQuestionsNotFoundError,
} from "../utils/errors/compositor";
import AnswersService from "../utils/services/answers.service";
import QuestionsService from "../utils/services/questions.service";

export class CompositorManager {
  static async deleteSurvey(
    surveyId: string
  ): Promise<(ISurveyQuestions | Object)[]> {
    const surveyQuestions = await QuestionsService.deleteQuestionSurvey(
      {},
      surveyId
    );

    const deleteInfo = await AnswersService.deleteAnswer({}, surveyId);

    if (!surveyQuestions) throw new SurveyQuestionsNotFoundError();

    if (!deleteInfo) throw new SurveyAnswersNotFoundError();

    return [surveyQuestions, deleteInfo];
  }

  static async getSurveyResults(
    surveyId: string
  ): Promise<(ISurveyQuestions | ISurveyAnswers[])[]> {
    const surveyAnswers = await AnswersService.getAnswer({}, surveyId);
    const surveyQuestions = await QuestionsService.getQuestionSurvey(
      {},
      surveyId
    );
    if (!surveyQuestions) throw new SurveyQuestionsNotFoundError();
    if (!surveyAnswers) throw new SurveyAnswersNotFoundError();

    return [surveyQuestions, surveyAnswers];
  }
}
