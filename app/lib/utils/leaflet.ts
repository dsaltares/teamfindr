import type { Coordinates } from '../types';

export const toLeaflet = (coordinates: Coordinates): Coordinates => [
  coordinates[1],
  coordinates[0],
];
