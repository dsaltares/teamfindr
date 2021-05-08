import React from 'react';
import { Event } from '../../types';

import EventListItem from './EventListItem';

const config = { title: 'EventListItem' };

const event: Event = {
  id: '99ade135-c558-4ba4-8b66-9d90f0bb89e5',
  createdAt: '2021-05-03T15:21:18.203Z',
  startsAt: '2021-05-25T17:30:00.000Z',
  venue: {
    id: '13728a6b-d5ca-4bc5-b739-a585e4501c93',
    name: 'SquashTech',
    location: {
      geo: {
        type: 'Point',
        coordinates: [23.589434323366735, 46.754332161616496],
      },
      country: 'Romania',
      city: 'Cluj-Napoca',
      postcode: '400492',
      type: 'street',
      name: 'Strada Meteor',
      description: '400492, Cluj-Napoca, Romania',
    },
  },
  sport: 'Squash',
  duration: 60,
  capacity: 2,
  description: 'Test',
  price: {
    amount: 5,
    currency: 'RON',
  },
  linkOnly: true,
  teams: ['Artistic Frogs', 'Gleaming Centipedes'],
  createdBy: {
    id: 'a143b57a-6a50-4b53-a0bd-0f47ec1478b6',
    roles: [],
    email: 'david.saltares@aula.education',
    firstName: 'David',
    lastName: 'Saltares',
    avatar:
      'https://res.cloudinary.com/teamfindr/image/upload/v1615746455/teamfindr/bd30o0rvncnr04aczytb.jpg',
  },
  numParticipants: 2,
  participants: [],
};

export const Squash = () => <EventListItem event={event} />;

export default config;
