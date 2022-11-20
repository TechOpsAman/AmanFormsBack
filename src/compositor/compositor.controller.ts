import { Request, Response } from 'express';
//import { iSurvey, iSection } from './answers.interface';
import { CompositorManager } from './compositor.manager';

export class CompositorController {
  static async deleteSurvey(req: Request, res: Response): Promise<void> {
    const { surveyId } = req.query as any; // Why not string?
    res.json(await CompositorManager.deleteSurvey(surveyId));
  }

  static async getSurveyResults(req: Request, res: Response): Promise<void> {
    const { surveyId } = req.query as any;
    res.json(await CompositorManager.getSurveyResults(surveyId));
  }
}
