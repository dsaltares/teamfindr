import Config from './config';

export const API_URL =
  Config.isDevelopment || window.location.hostname === 'localhost'
    ? 'http://localhost:3000/api'
    : `https://${window.location.hostname}/api`;
