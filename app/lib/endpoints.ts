export const API_URL =
  process.env.NODE_ENV === 'development' ||
  window.location.hostname === 'localhost'
    ? 'http://localhost:3000/api'
    : 'https://teamfindr.saltares.com/api';
