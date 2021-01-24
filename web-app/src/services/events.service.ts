import axios from 'axios';
import { API_URL } from '../endpoints';
import { Event, Price, Sport, Location, Participant } from '../types';
import encodeQueryData from '../utils/encodeQueryData';

export interface CreateEventParams {
  startsAt: string;
  venue: string;
  sport: Sport;
  duration: number;
  capacity: number;
  description: string;
  price: Price;
  autoJoin: boolean;
  linkOnly: boolean;
}

export interface GetEventsParams {
  location?: Location | null;
  radius?: number;
  sports?: Sport[];
  date?: Date | null;
  excludeFull?: boolean;
  venue?: string;
  after?: Date | null;
  before?: Date | null;
  isParticipant?: boolean;
}

export interface ModifyParticipantResponse {
  event: Event;
  participants: Participant[];
}

const eventsService = {
  createEvent: async ({
    autoJoin,
    ...params
  }: CreateEventParams): Promise<Event> => {
    const {
      data: { event },
    } = await axios.post(
      `${API_URL}/events`,
      { event: params, autoJoin },
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
    venue,
    after,
    before,
    isParticipant,
  }: GetEventsParams): Promise<Event[]> => {
    const coords = location?.geo.coordinates || [];
    const query = encodeQueryData({
      lon: coords[0],
      lat: coords[1],
      radius,
      sports: sports ? sports?.join(':') : undefined,
      date: date ? date.toISOString() : undefined,
      excludeFull,
      venue,
      after: after ? after.toISOString() : undefined,
      before: before ? before.toISOString() : undefined,
      isParticipant,
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
  getParticipants: async (id: string): Promise<Participant[]> => {
    const {
      data: { participants },
    } = await axios.get(`${API_URL}/participants/${id}`, {
      withCredentials: true,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
    });
    return participants;
  },
  addParticipant: async (id: string): Promise<ModifyParticipantResponse> => {
    const {
      data: { participants, event },
    } = await axios.post(`${API_URL}/participants/${id}`, undefined, {
      withCredentials: true,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
    });
    return { participants, event };
  },
  deleteParticipant: async (id: string): Promise<ModifyParticipantResponse> => {
    const {
      data: { participants, event },
    } = await axios.delete(`${API_URL}/participants/${id}`, {
      withCredentials: true,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
    });
    return { participants, event };
  },
  cancelEvent: async (id: string): Promise<Event> => {
    const {
      data: { event },
    } = await axios.patch(
      `${API_URL}/events/${id}`,
      {
        event: { canceledAt: new Date() },
      },
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
