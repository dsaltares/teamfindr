const fs = require('fs-extra');

const getConfig = async () => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  return isDevelopment
    ? fs.readJSON('./findrConfig.json')
    : JSON.parse(process.env.TEAM_FINDR_CONFIG);
};

module.exports = getConfig;
