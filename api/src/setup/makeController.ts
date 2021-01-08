import express from 'express';
import { Controller, Request } from '../routes/controller';
import { Services } from './setupServices';

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
    services.logger.error('request error', { error });
    const status = error.status || 500;
    const message = error.message || 'Unhandled error';
    res.status(status).json({ message });
  }
};

export default makeController;
