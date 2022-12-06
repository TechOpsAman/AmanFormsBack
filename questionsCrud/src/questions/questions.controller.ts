import { Request, Response } from "express";
import { QuestionManager } from "./questions.manager";

export class QuestionController {
  static async getAll(_req: Request, res: Response): Promise<void> {
    res.json(await QuestionManager.getAll());
  }
  static async updateLastUpdated(req: Request, res: Response): Promise<void> {
    res.json(await QuestionManager.updateLastUpdated(req.query.id as string));
  }

  static async createSurvey(req: Request, res: Response): Promise<void> {
    res.json(
      await QuestionManager.createSurvey(
        req.body.surveyName,
        req.body.surveyDescription,
        req.body.creatorId,
        req.body.content
      )
    );
  }

  static async updateContent(req: Request, res: Response): Promise<void> {
    res.json(
      await QuestionManager.updateContent(
        req.body.surveyId,
        req.body.content
      )
    );
  }

  static async updateSurvey(req: Request, res: Response): Promise<void> {
    res.json(
      await QuestionManager.updateSurvey(
        req.body.surveyId,
        req.body.surveyName,
        req.body.surveyDescription,
        req.body.content
      )
    );
  }

  static async getSurveyById(req: Request, res: Response): Promise<void> {
    res.json(await QuestionManager.getSurveyById(req.query.id as string));
  }

  static async deleteSurveyById(req: Request, res: Response): Promise<void> {
    res.json(await QuestionManager.deleteSurveyById(req.query.id as string));
  }

  static async getQuestion(req: Request, res: Response): Promise<void> {
    res.json(
      await QuestionManager.getQuestion(
        req.query.surveyId as string,
        req.query.questionId as string
      )
    );
  }

  static async deleteQuestion(req: Request, res: Response): Promise<void> {
    res.json(
      await QuestionManager.deleteQuestion(
        req.query.surveyId as string,
        req.query.questionId as string
      )
    );
  }

  static async updateQuestion(req: Request, res: Response): Promise<void> {
    res.json(
      await QuestionManager.updateQuestion(
        req.query.surveyId as string,
        req.query.questionId as string,
        req.body.content
      )
    );
  }
}
