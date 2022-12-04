import { Question, Survey } from './questions.interface';
import { QuestionModel } from './questions.model';

export class QuestionRepository {
  static createSurvey(
    surveyName: string,
    surveyDescription: string,
    creatorId: string,
    required: boolean,
    content: Array<Question>,
  ): Promise<Survey> {
    return QuestionModel.create({
      surveyName,
      surveyDescription,
      creatorId,
      required,
      content,
    } as Survey);
  }

  static updateSurvey(
    surveyId: string,
    surveyName: string,
    surveyDescription: string,
    required: boolean,
    content: Array<Question>,
  ): Promise<Survey | null> {
    return QuestionModel.findByIdAndUpdate(
      surveyId,
      { surveyName, surveyDescription, $push: { content: content }, required },
      { new: true },
    ).exec();
  }

  static updateSurveyWithoutName(
    surveyId: string,
    content: Array<Question>,
  ): Promise<Survey | null> {
    return QuestionModel.findByIdAndUpdate(
      surveyId,
      { $push: { content: content } },
      { new: true },
    ).exec();
  }

  static getSurveyById(surveyId: string): Promise<Survey | null> {
    return QuestionModel.findById(surveyId).exec();
  }

  static deleteSurveyById(surveyId: string): Promise<Survey | null> {
    return QuestionModel.findByIdAndDelete(surveyId).exec();
  }

  static deleteQuestion(
    surveyId: string,
    question: Question,
  ): Promise<Survey | null> {
    return QuestionModel.findByIdAndUpdate(
      surveyId,
      {
        $pull: { content: question },
      },
      { new: true },
    ).exec();
  }
}
