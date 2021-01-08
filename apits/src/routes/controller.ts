import express from 'express';
import { User } from '../types';
import { Services } from '../setup/setupServices';

export type Request = express.Request & {
  user: User;
};

type ControllerResponse = {
  status?: number;
  body?: any;
  redirect?: string;
};
export type Controller = (req: Request) => Promise<ControllerResponse>;
export type ControllerCreator = (services: Services) => Controller;
