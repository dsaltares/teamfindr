import express from 'express';
import { Config } from '../types';
import { ControllerCreator } from './controller';

type Handler = (req: express.Request, res: express.Response) => Promise<any>;

export type Route = {
  method: 'get' | 'post' | 'put' | 'patch' | 'delete';
  path: string;
  controller?: ControllerCreator;
  handler?: Handler;
  requiresAuthentication?: boolean;
  requiresAdmin?: boolean;
};

export type RouteDefinitions = {
  basePath: string;
  routes: (config: Config) => Route[];
};
