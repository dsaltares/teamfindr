import GetParticipantsController from './getParticipants';
import PostParticipantController from './postParticipant';
import DeleteParticipantController from './deleteParticipant';
import { RouteDefinitions } from '../routeDef';

const participantRoutes: RouteDefinitions = {
  basePath: '/participants',
  routes: () => [
    {
      method: 'get',
      path: ':eventId',
      controller: GetParticipantsController,
    },
    {
      method: 'post',
      path: ':eventId',
      controller: PostParticipantController,
      requiresAuthentication: true,
    },
    {
      method: 'delete',
      path: ':eventId',
      controller: DeleteParticipantController,
      requiresAuthentication: true,
    },
  ],
};

export default participantRoutes;
