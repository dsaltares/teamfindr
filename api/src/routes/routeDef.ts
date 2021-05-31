import express from 'express';
import { Config, Request } from '../types';
import { ControllerCreator } from './controller';

type Handler = (req: Request, res: express.Response) => Promise<any>;

export type Route = {
  method: 'get' | 'post' | 'put' | 'patch' | 'delete';
  path: string;
  controller?: ControllerCreator;
  handler?: Handler;
  requiresAuthentication?: boolean;
  renewSession?: boolean;
};

export type RouteDefinitions = {
  basePath: string;
  routes: (config: Config) => Route[];
};
