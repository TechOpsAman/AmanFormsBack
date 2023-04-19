import { Request, Response } from "express";
import { QuestionManager } from "./questions.manager";

export class QuestionController {
  static async getAll(req: Request, res: Response): Promise<void> {
    res.json(await QuestionManager.getAll(req.query.creatorId as string));
  }
  static async updateLastUpdated(req: Request, res: Response): Promise<void> {
    res.json(await QuestionManager.updateLastUpdated(req.query.id as string));
  }
  static async updateRepliers(req: Request, res: Response): Promise<void> {
    res.json(await QuestionManager.updateRepliers(req.body.surveyId as string, req.body.repliers));
  }
  static async updateIsOpen(req: Request, res: Response): Promise<void> {
    res.json(await QuestionManager.updateIsOpen(req.body.surveyId as string, req.body.isOpen));
  }

  static async createSurvey(req: Request, res: Response): Promise<void> {
    res.json(
      await QuestionManager.createSurvey(
        req.body.surveyName,
        req.body.surveyDescription,
        req.body.creatorId,
        req.body.content,
        req.body.annonimous,
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
