import { Question, Survey } from "./questions.interface";
import { QuestionModel } from "./questions.model";

export class QuestionRepository {
  static getAll() {
    return QuestionModel.find({}).exec();
  }

  static createSurvey(
    surveyName: string,
    surveyDescription: string,
    creatorId: string,
    content: Array<Question>,
    annonimous: boolean
  ): Promise<Survey> {
    return QuestionModel.create({
      surveyName,
      surveyDescription,
      creatorId,
      content,
      annonimous,
      repliers: [],
    } as Survey);
  }

  static updateSurvey(
    surveyId: string,
    surveyName: string,
    surveyDescription: string,
    content: Array<Question>
  ): Promise<Survey | null> {
    return QuestionModel.findByIdAndUpdate(
      surveyId,
      { surveyName, surveyDescription, $push: { content: content } },
      { new: true }
    ).exec();
  }

  static updateRepliers(
    surveyId: string,
    replier: string
  ): Promise<Survey | null> {
    return QuestionModel.findByIdAndUpdate(
      surveyId,
      { $push: { repliers: replier } },
      { new: true }
    ).exec();
  }

  static updateSurveyWithoutName(
    surveyId: string,
    content: Array<Question>
  ): Promise<Survey | null> {
    return QuestionModel.findByIdAndUpdate(
      surveyId,
      { $push: { content: content } },
      { new: true }
    ).exec();
  }

  static updateContent(
    surveyId: string,
    content: Array<Question>
  ): Promise<Survey | null> {
    return QuestionModel.findByIdAndUpdate(
      surveyId,
      { content: content },
      { new: true }
    ).exec();
  }

  static getSurveyById(surveyId: string): Promise<Survey | null> {
    return QuestionModel.findById(surveyId).exec();
  }

  static deleteSurveyById(surveyId: string): Promise<Survey | null> {
    return QuestionModel.findByIdAndDelete(surveyId).exec();
  }

  static updateLastUpdated(surveyId: string): Promise<Survey | null> {
    return QuestionModel.findByIdAndUpdate(
      surveyId,
      { lastUpdated: Date.now() },
      { new: true }
    ).exec();
  }

  static deleteQuestion(
    surveyId: string,
    question: Question
  ): Promise<Survey | null> {
    return QuestionModel.findByIdAndUpdate(
      surveyId,
      {
        $pull: { content: question },
      },
      { new: true }
    ).exec();
  }
}
