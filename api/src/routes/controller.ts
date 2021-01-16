import { Request } from '../types';
import { Services } from '../setup/setupServices';

type ControllerResponse = {
  status?: number;
  body?: any;
  redirect?: string;
};
export type Controller = (req: Request) => Promise<ControllerResponse>;
export type ControllerCreator = (services: Services) => Controller;
