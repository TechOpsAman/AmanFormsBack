import { Router } from 'express';
import { QuestionRouter } from './questions/questions.router';

const AppRouter: Router = Router();

AppRouter.use('/api/questions', QuestionRouter);

/* istanbul ignore next */
AppRouter.use('/isalive', (_req, res) => {
  res.status(200).send('alive');
});

AppRouter.use('*', (_req, res) => {
  res.status(404).send('Invalid Route');
});

export { AppRouter };
