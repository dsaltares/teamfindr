import type { SearchEventParams } from '@lib/data/searchEvents';
import type { SearchVenuesParams } from '@lib/data/searchVenues';

type Query = Partial<{ [key: string]: string | string[] }>;

export const parseSearchEventsQuery = ({
  lat,
  lon,
  radius,
  isParticipant,
  ...query
}: Query) => {
  const lonNumber = lon ? parseFloat(lon as string) : undefined;
  const latNumber = lat ? parseFloat(lat as string) : undefined;
  const radiusNumber = radius ? parseFloat(radius as string) : undefined;
  const isParticipantBoolean = isParticipant
    ? isParticipant === 'true'
    : undefined;
  return {
    ...query,
    lat: latNumber,
    lon: lonNumber,
    radius: radiusNumber,
    isParticipant: isParticipantBoolean,
  } as SearchEventParams['query'];
};

export const parseSearchVenuesQuery = ({
  lat,
  lon,
  radius,
  ...query
}: Query) => {
  const lonNumber = lon ? parseFloat(lon as string) : undefined;
  const latNumber = lat ? parseFloat(lat as string) : undefined;
  const radiusNumber = radius ? parseFloat(radius as string) : undefined;
  return {
    ...query,
    lat: latNumber,
    lon: lonNumber,
    radius: radiusNumber,
  } as SearchVenuesParams;
};
