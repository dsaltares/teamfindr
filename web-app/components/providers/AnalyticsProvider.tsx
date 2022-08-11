import { createContext, useContext } from 'react';
import type { AnalyticsInstance } from 'analytics';
import Analytics from 'analytics';
import googleAnalytics from '@analytics/google-analytics';

const analytics = Analytics({
  app: 'teamfindr',
  plugins: [
    googleAnalytics({
      trackingId: 'UA-4440744-4',
    }),
  ],
});

const AnalyticsContext = createContext<AnalyticsInstance>(analytics);

interface AnalyticsProviderProps {
  analytics?: AnalyticsInstance;
}

const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({
  children,
  analytics: injectedServices,
}) => (
    <AnalyticsContext.Provider value={injectedServices || analytics}>
      {children}
    </AnalyticsContext.Provider>
  );

export const useAnalytics = () => useContext(AnalyticsContext);

export default AnalyticsProvider;
