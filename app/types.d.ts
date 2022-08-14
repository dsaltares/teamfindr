import type { User } from '@lib/types';

/* eslint-disable no-var */
export {};

declare global {
  interface Window {
    wpcc: {
      init: (config: object) => void;
    };
  }

  var _mongoClientPromise: Promise<MongoClient> | undefined;

  namespace Express {
    interface User {
      id: string;
      email: string;
      avatar?: string;
      firstName?: string;
      lastName?: string;
      roles: string[];
    }
  }
}
declare module 'http' {
  interface IncomingMessage {
    session: {
      forceRenew?: Date;
      redirect?: string;
    };
    user?: User;
    logout: () => void;
    login: (user: User, cb: (err: any) => void) => void;
  }
}

declare module '@analytics/google-analytics' {
  type GoogleAnalyticsConfig = {
    trackingId: string;
  };
  function googleAnalytics({
    trackingId,
  }: GoogleAnalyticsConfig): Record<string, unknown>;

  export default googleAnalytics;
}
