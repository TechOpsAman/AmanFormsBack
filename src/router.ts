import { Router } from 'express';
import { AnswerRouter } from './answers/answers.router';

const AppRouter: Router = Router();

AppRouter.use('/api/answers', AnswerRouter);

AppRouter.use('/isalive', (_req, res) => {
  res.status(200).send('alive');
});

AppRouter.use('*', (_req, res) => {
  res.status(404).send('Invalid Route');
});

export { AppRouter };
