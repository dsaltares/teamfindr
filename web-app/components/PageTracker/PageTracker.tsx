import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAnalytics } from '@components/providers/AnalyticsProvider';

const PageTracker: React.FC = () => {
  const location = useLocation();
  const analytics = useAnalytics();

  useEffect(() => {
    void analytics.page({ url: window.location.href });
  }, [location, analytics]);

  return null;
};

export default React.memo(PageTracker);
