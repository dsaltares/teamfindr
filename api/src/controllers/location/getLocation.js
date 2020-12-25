const geoip = require('geoip-lite');

const getLocation = () => (req) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const location = geoip.lookup(ip);
  if (!location) {
    return {
      status: 404,
      body: {
        message: 'Could not get location',
      },
    };
  }

  const {
    ll: [latitude, longitude],
  } = location;
  return {
    status: 200,
    body: {
      location: { latitude, longitude },
    },
  };
};

module.exports = getLocation;
