import express from 'express';
import { Controller } from '../routes/controller';
import { Services } from './setupServices';
import { Request } from '../types';

interface MakeControllerArgs {
  controller: Controller;
  services: Services;
}

const makeController = ({ controller, services }: MakeControllerArgs) => async (
  req: Request,
  res: express.Response
) => {
  try {
    const response = await controller(req);
    const { status, body, redirect } = response;
    if (status) {
      res.status(status);
    }
    if (redirect) {
      res.redirect(redirect);
    }
    if (body) {
      res.json(body);
    }
  } catch (error) {
    services.logger.error('request error', {
      path: req.path,
      query: req.query,
      method: req.method,
      userId: req.user && req.user.id,
      error,
    });
    const status = error.status || 500;
    const message = error.message || 'Unhandled error';
    res.status(status).json({ message });
  }
};

export default makeController;
