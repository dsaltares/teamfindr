const Config = {
  hostUrl: process.env.HOST_URL as string,
  databaseURI: process.env.DATABASE_URI,
  authentication: {
    twitter: {
      clientId: process.env.TWITTER_CLIENT_ID as string,
      clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
    },
    facebook: {
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    cookieKey: process.env.COOKIE_KEY as string,
  },
  isDevelopment: process.env.NODE_ENV === 'development',
};

export default Config;
