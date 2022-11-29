import { AnswerRepository } from './answers.repository';
import { ISurvey } from './answers.interface';
import { SurveyNotFound } from '../utils/errors/answer';

export class AnswerManager {
  static async create(newSurvey: ISurvey): Promise<ISurvey> {
    return AnswerRepository.create(newSurvey);
  }

  static async showSurveyById(surveyId: string): Promise<ISurvey[]> {
    const survey = await AnswerRepository.showSurveyById(surveyId);
    if (survey.length !== 0) {
      return survey;
    } else {
      throw new SurveyNotFound();
    }
  }

  static async deleteSurveyById(surveyId: string): Promise<ISurvey | null> {
    const survey = await AnswerRepository.deleteSurveyById(surveyId);

    if (!survey) throw new SurveyNotFound();
    return survey;
  }
}