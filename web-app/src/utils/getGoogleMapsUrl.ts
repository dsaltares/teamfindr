import { isIOS } from 'react-device-detect';
import { Venue } from '../types';

const getGoogleMapsUrl = (venue?: Venue) => {
  if (!venue) {
    return '';
  }

  const [lon, lat] = venue.location.geo.coordinates;
  const protocol = isIOS ? `maps` : `https`;
  return `${protocol}://maps.google.com/maps?daddr=${lat},${lon}&amp;ll=`;
};

export default getGoogleMapsUrl;
