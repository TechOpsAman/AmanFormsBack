/* eslint-disable @typescript-eslint/no-unused-vars */
import { QuestionRepository } from './questions.repository';
import { Question, Survey } from './questions.interface';
import {
  QuestionNotFoundError,
  SurveyNotFoundError,
} from '../utils/errors/questions';
export class QuestionManager {
  static async createSurvey(
    surveyName: string,
    creatorId: string,
    required: boolean,
    content: Array<Question>,
  ): Promise<Survey> {    
    return QuestionRepository.createSurvey(surveyName, creatorId, required, content);
  }

  static async updateSurvey(
    surveyId: string,
    surveyName: string,
    required: boolean,    
    content: Array<Question>,
  ): Promise<Survey | null> {
    let survey;
    if (surveyName === '' || !surveyName)
      survey = await QuestionRepository.updateSurveyWithoutName(surveyId, content);
    else
      survey = await QuestionRepository.updateSurvey(surveyId, surveyName, required, content);

    if (!survey) throw new SurveyNotFoundError();
    return survey;
  }

  static async getSurveyById(surveyId: string): Promise<Survey | null> {
    const survey = await QuestionRepository.getSurveyById(surveyId);

    if (!survey) throw new SurveyNotFoundError();
    return survey;
  }

  static async deleteSurveyById(surveyId: string): Promise<Survey | null> {
    const survey = await QuestionRepository.deleteSurveyById(surveyId);

    if (!survey) throw new SurveyNotFoundError();
    return survey;
  }

  static async getQuestion(
    surveyId: string,
    questionId: string,
  ): Promise<Question | null> {
    const tempSurvey = await QuestionRepository.getSurveyById(surveyId);
    if (!tempSurvey) throw new SurveyNotFoundError();

    const survey = tempSurvey as unknown as Survey;

    for (let index = 0; index < survey.content.length; index++) {
      if (survey.content[index].id === questionId) {
        return survey.content[index];
      }
    }

    throw new QuestionNotFoundError();
  }

  static async deleteQuestion(
    surveyId: string,
    questionId: string,
  ): Promise<Survey | null> {
    const question = (await this.getQuestion(
      surveyId,
      questionId,
    )) as unknown as Question;

    if (!question) throw new QuestionNotFoundError();

    const survey = await QuestionRepository.deleteQuestion(surveyId, question);

    if (!survey) throw new SurveyNotFoundError();
    return survey;
  }

  static async updateQuestion(
    surveyId: string,
    questionId: string,
    content: Array<Question>,
  ): Promise<Survey | null> {
    const survey = await this.deleteQuestion(surveyId, questionId);

    if (!survey) throw new SurveyNotFoundError();

    const updatedSurvey = await QuestionRepository.updateSurveyWithoutName(
      surveyId,
      content,
    );

    if (!updatedSurvey) throw new SurveyNotFoundError();
    return updatedSurvey;
  }
}
