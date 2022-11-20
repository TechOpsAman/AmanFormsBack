import { iSurvey } from './answers.interface';
import { AnswerModel } from './answers.model';

export class AnswerRepository {
  static create(newSurvey: iSurvey): Promise<iSurvey> {
    return AnswerModel.create(newSurvey);
  }

  static showSurveyById(surveyId: string): Promise<iSurvey[]> {
    return AnswerModel.find({ surveyId }).exec();
  }
}
