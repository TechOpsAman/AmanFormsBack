/* eslint-disable @typescript-eslint/no-unused-vars */
import { QuestionRepository } from "./questions.repository";
import { Question, Survey } from "./questions.interface";
import {
  QuestionNotFoundError,
  SurveyNotFoundError,
} from "../utils/errors/questions";
export class QuestionManager {
  static async getAll(creatorId: string) {
    return QuestionRepository.getAll(creatorId);
  }
  static async updateLastUpdated(surveyId: string) {
    return QuestionRepository.updateLastUpdated(surveyId);
  }
  static async updateRepliers(surveyId: string, repliers: string) {
    return QuestionRepository.updateRepliers(surveyId, repliers);
  }
  static async updateIsOpen(surveyId: string, isOpen: boolean) {
    return QuestionRepository.updateIsOpen(surveyId, isOpen);
  }

  static async updateContent(surveyId: string, content: Question[]) {
    return QuestionRepository.updateContent(surveyId, content);
  }

  static async createSurvey(
    surveyName: string,
    surveyDescription: string,
    creatorId: string,
    content: Array<Question>,
    annonimous: boolean
  ): Promise<Survey> {
    return QuestionRepository.createSurvey(
      surveyName,
      surveyDescription,
      creatorId,
      content,
      annonimous
    );
  }

  static async updateSurvey(
    surveyId: string,
    surveyName: string,
    surveyDescription: string,
    content: Array<Question>
  ): Promise<Survey | null> {
    let survey;
    if (surveyName === "" || !surveyName)
      survey = await QuestionRepository.updateSurveyWithoutName(
        surveyId,
        content
      );
    else
      survey = await QuestionRepository.updateSurvey(
        surveyId,
        surveyName,
        surveyDescription,
        content
      );

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
    questionId: string
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
    questionId: string
  ): Promise<Survey | null> {
    const question = (await this.getQuestion(
      surveyId,
      questionId
    )) as unknown as Question;

    if (!question) throw new QuestionNotFoundError();

    const survey = await QuestionRepository.deleteQuestion(surveyId, question);

    if (!survey) throw new SurveyNotFoundError();
    return survey;
  }

  static async updateQuestion(
    surveyId: string,
    questionId: string,
    content: Array<Question>
  ): Promise<Survey | null> {
    const survey = await this.deleteQuestion(surveyId, questionId);

    if (!survey) throw new SurveyNotFoundError();

    const updatedSurvey = await QuestionRepository.updateSurveyWithoutName(
      surveyId,
      content
    );

    if (!updatedSurvey) throw new SurveyNotFoundError();
    return updatedSurvey;
  }
}
