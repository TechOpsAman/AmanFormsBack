import { ISurvey } from './answers.interface';
import { AnswerModel } from './answers.model';

export class AnswerRepository {
  static create(newSurvey: ISurvey): Promise<ISurvey> {
    return AnswerModel.create(newSurvey);
  }

  static showSurveyById(surveyId: string): Promise<ISurvey[]> {
    return AnswerModel.find({ surveyId }).exec();
  }

  static deleteSurveyById(surveyId: string): Promise<ISurvey[] | null> {
    return AnswerModel.deleteMany({ surveyId: surveyId }).exec();
  }
}
