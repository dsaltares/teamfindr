import requestIp from 'request-ip';
import geoip from 'geoip-lite';
import createRoute, { type Handler } from '@lib/api/createRoute';

const getLocationHandler: Handler = (req) => {
  const ip = requestIp.getClientIp(req);
  const geo = geoip.lookup(ip as string);

  if (!geo) {
    return {
      status: 404,
      body: { message: 'location not found' },
    };
  }

  return {
    status: 200,
    body: { coordinates: [geo.ll[1], geo.ll[0]] },
  };
};

export default createRoute([
  {
    method: 'get',
    handler: getLocationHandler,
    requiresAuth: false,
  },
]);
