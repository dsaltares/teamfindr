import fs from 'fs-extra';
import { Config } from '../types';

const getConfig = async (): Promise<Config> => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  const config = isDevelopment
    ? fs.readJSON('./findrConfig.json')
    : JSON.parse(process.env.TEAM_FINDR_CONFIG);
  return config;
};

export default getConfig;
