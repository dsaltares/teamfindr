export const API_URL =
  process.env.NODE_ENV === 'development' || true
    ? 'http://localhost:5000'
    : 'https://api.teamfindr.saltares.com';
