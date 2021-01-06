import GetParticipantsController from './getParticipants';
import PostParticipantController from './postParticipant';
import DeleteParticipantController from './deleteParticipant';

const usersRoutes = {
  basePath: '/participants',
  routes: () => [
    {
      method: 'get',
      path: ':eventId',
      controller: GetParticipantsController,
      requiresAuthentication: true,
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

export default usersRoutes;
