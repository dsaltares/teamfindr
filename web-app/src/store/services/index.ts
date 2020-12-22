import authService from './auth';

export type Injections = {
  authService: typeof authService;
};

const services: Injections = {
  authService,
};

export default services;
