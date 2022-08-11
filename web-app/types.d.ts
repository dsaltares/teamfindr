declare module '@analytics/google-analytics' {
  interface GoogleAnalyticsConfig {
    trackingId: string;
  }

  function googleAnalytics(
    config: GoogleAnalyticsConfig
  ): Record<string, unknown>;

  export default googleAnalytics;
}
