import { Server } from 'http';
import { Server as SocketServer } from 'socket.io';
import cookieSession from 'cookie-session';
import sharedSession from 'express-socket.io-session';
import { ServiceDependencies } from './setupServiceDependencies';

const setupSocket = (deps: ServiceDependencies, server: Server) => {
  deps.logger.info('setting up socket server');

  const io = new SocketServer(server, {
    pingTimeout: 25000,
    pingInterval: 30000,
    cors: {
      origin: deps.config.clientUrl,
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  io.use(
    sharedSession(
      cookieSession({
        name: 'session',
        keys: [deps.config.cookieKey],
      }),
      { autoSave: true }
    )
  );

  io.on('connection', (socket) => {
    deps.socketStore.addSocket(socket);
    socket.on('disconnect', () => deps.socketStore.removeSocket(socket));
  });
};

export default setupSocket;
