import { Request, Response } from 'express';
//import { iSurvey, iSection } from './answers.interface';
import { AnswerManager } from './answers.manager';

export class AnswerController {
  static async create(req: Request, res: Response): Promise<void> {
    const newSurvey = req.body;
    res.json(await AnswerManager.create(newSurvey));
  }

  static async showSurveyById(req: Request, res: Response): Promise<void> {
    res.json(await AnswerManager.showSurveyById(req.query.surveyId as string));
  }

  static async deleteSurveyById(req: Request, res: Response): Promise<void> {
    res.json(
      await AnswerManager.deleteSurveyById(req.query.surveyId as string),
    );
  }
}
