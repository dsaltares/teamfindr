import axios from 'axios';
import { API_URL } from '../endpoints';
import { Event, Price, Sport, Location } from '../types';
import encodeQueryData from '../utils/encodeQueryData';

export interface CreateEventParams {
  startsAt: string;
  venue: string;
  sport: Sport;
  duration: number;
  capacity: number;
  description: string;
  price: Price;
}

export interface GetEventsParams {
  location?: Location | null;
  radius?: number;
  sports?: Sport[];
  date?: Date | null;
  excludeFull?: boolean;
}

const eventsService = {
  createEvent: async (params: CreateEventParams): Promise<Event> => {
    const {
      data: { event },
    } = await axios.post(
      `${API_URL}/events`,
      { event: params },
      {
        withCredentials: true,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true,
        },
      }
    );
    return event;
  },

  getEvents: async ({
    location,
    radius,
    sports,
    date,
    excludeFull,
  }: GetEventsParams): Promise<Event[]> => {
    const coords = location?.geo.coordinates || [];
    const query = encodeQueryData({
      lon: coords[0],
      lat: coords[1],
      radius,
      sports: sports ? sports?.join(':') : undefined,
      date: date ? date.toISOString() : undefined,
      excludeFull,
    });
    const {
      data: { events },
    } = await axios.get(`${API_URL}/events?${query}`, {
      withCredentials: true,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
    });
    return events;
  },
  getEvent: async (id: string): Promise<Event> => {
    const {
      data: { event },
    } = await axios.get(`${API_URL}/events/${id}`, {
      withCredentials: true,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
    });
    return event;
  },
};

export default eventsService;
