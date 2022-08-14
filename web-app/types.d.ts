import type { User } from '@lib/types';

/* eslint-disable no-var */
export {};

declare module '@analytics/google-analytics' {
  interface GoogleAnalyticsConfig {
    trackingId: string;
  }

  function googleAnalytics(
    config: GoogleAnalyticsConfig
  ): Record<string, unknown>;

  export default googleAnalytics;
}

declare global {
  interface Window {
    wpcc: {
      init: (config: object) => void;
    };
  }
}
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
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
