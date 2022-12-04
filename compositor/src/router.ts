import { Router } from 'express';
import { compositorRouter } from './compositor/compositor.router';

const AppRouter: Router = Router();

AppRouter.use('/api/compositor', compositorRouter);

AppRouter.use('/isalive', (_req, res) => {
  res.status(200).send('alive');
});

AppRouter.use('*', (_req, res) => {
  res.status(404).send('Invalid Route');
});

export { AppRouter };
