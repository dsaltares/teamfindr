const GetParticipantsController = require('../controllers/participants/getParticipants');
const PostParticipantController = require('../controllers/participants/postParticipant');
const DeleteParticipantController = require('../controllers/participants/deleteParticipant');

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

module.exports = usersRoutes;
