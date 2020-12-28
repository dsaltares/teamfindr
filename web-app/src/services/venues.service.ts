import axios from 'axios';
import { API_URL } from '../endpoints';
import { Location, Venue } from '../types';

export interface CreateVenueParams {
  name: string;
  location: Location;
}

const venuesService = {
  createVenue: async ({
    name,
    location,
  }: CreateVenueParams): Promise<Venue> => {
    const {
      data: { venue },
    } = await axios.post(
      `${API_URL}/venues`,
      { venue: { name, location } },
      {
        withCredentials: true,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true,
        },
      }
    );
    return venue;
  },
};

export default venuesService;
