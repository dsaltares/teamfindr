export const API_URL =
  process.env.NODE_ENV === 'development' ||
  window.location.hostname === 'localhost'
    ? 'http://localhost:3001'
    : 'https://api.teamfindr.saltares.com';
