import fs from 'fs-extra';

interface PassportConfig {
  clientID: string;
  clientSecret: string;
}

export interface Config {
  port: number;
  authentication: {
    facebook: PassportConfig;
    twitter: PassportConfig;
  };
  databaseURI: string;
  cookieKey: string;
}

const getConfig = async (): Promise<Config> => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  return isDevelopment
    ? fs.readJSON('./findrConfig.json')
    : JSON.parse(process.env.TEAM_FINDR_CONFIG);
};

export default getConfig;
