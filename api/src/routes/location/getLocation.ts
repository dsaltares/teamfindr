import geoip from 'geoip-lite';
import { ControllerCreator } from '../controller';

const GetLocationController: ControllerCreator = () => async ({
  headers,
  connection,
}) => {
  const ip = headers['x-forwarded-for'] || connection.remoteAddress;
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

export default GetLocationController;
