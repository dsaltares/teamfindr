import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAnalytics } from '../../providers/AnalyticsProvider';

const PageTracker: React.FC = () => {
  const location = useLocation();
  const analytics = useAnalytics();

  useEffect(() => {
    analytics.page();
  }, [location, analytics]);

  return null;
};

export default React.memo(PageTracker);
