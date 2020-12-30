import axios from 'axios';
import { API_URL } from '../endpoints';
import { Event, Price, Sport } from '../types';

export interface CreateEventParams {
  startsAt: string;
  venue: string;
  sport: Sport;
  duration: number;
  numPlayers: number;
  description: string;
  price: Price;
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
};

export default eventsService;
