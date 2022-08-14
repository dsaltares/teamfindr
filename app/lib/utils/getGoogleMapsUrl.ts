import type { Venue } from '../types';

const getGoogleMapsUrl = (venue?: Venue) => {
  if (!venue) {
    return '';
  }

  const [lon, lat] = venue.location.geo.coordinates;
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`;
};

export default getGoogleMapsUrl;
