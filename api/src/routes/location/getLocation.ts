import requestIp from 'request-ip';
import geoip from 'geoip-lite';
import { ControllerCreator } from '../controller';

const GetLocationController: ControllerCreator = () => async (req) => {
  const ip = requestIp.getClientIp(req);
  const geo = geoip.lookup(ip);

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

export default GetLocationController;
