import axios from 'axios';
import { API_URL } from '../endpoints';
import { Location, Venue } from '../types';
import encodeQueryData from '../utils/encodeQueryData';

export interface CreateVenueParams {
  name: string;
  location: Location;
}

export interface GetVenuesParams {
  location?: Location | null;
  radius?: number;
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
  getVenues: async ({
    location,
    radius,
  }: GetVenuesParams): Promise<Venue[]> => {
    const coords = location?.geo.coordinates || [];
    const query = encodeQueryData({
      lon: coords[0],
      lat: coords[1],
      radius,
    });
    const {
      data: { venues },
    } = await axios.get(`${API_URL}/venues?${query}`, {
      withCredentials: true,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
    });
    return venues;
  },
  getVenue: async (id: string): Promise<Venue> => {
    const {
      data: { venue },
    } = await axios.get(`${API_URL}/venues/${id}`, {
      withCredentials: true,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
    });
    return venue;
  },
};

export default venuesService;
