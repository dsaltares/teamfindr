import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import GoogleAnalytics from 'react-ga';

GoogleAnalytics.initialize('UA-4440744-4');

const PageTracker: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    GoogleAnalytics.pageview(window.location.href);
  }, [location]);

  return null;
};

export default React.memo(PageTracker);
