import { Request, Response } from 'express';
import { CompositorManager } from './compositor.manager';

export class CompositorController {
  static async deleteSurvey(req: Request, res: Response): Promise<void> {
    res.json(await CompositorManager.deleteSurvey(req.query.surveyId as string));
  }

  static async getSurveyResults(req: Request, res: Response): Promise<void> {
    res.json(await CompositorManager.getSurveyResults(req.query.surveyId as string));
  }
}
