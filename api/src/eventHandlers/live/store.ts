import { Socket } from 'socket.io';
import { Logger } from 'winston';

type SocketWithPassportSession = Socket & {
  handshake: {
    session?: {
      passport?: {
        user?: string;
      };
    };
  };
};

interface Store {
  [key: string]: SocketWithPassportSession[];
}

const socketStore = (logger: Logger) => {
  const store: Store = {};

  const addSocket = (socket: SocketWithPassportSession) => {
    const userId = socket.handshake.session?.passport?.user;
    if (userId) {
      logger.info('user connected to socket', { userId });
      const sockets = store[userId] || [];
      sockets.push(socket);
      store[userId] = sockets;
    }
  };

  const removeSocket = (socket: SocketWithPassportSession) => {
    const userId = socket.handshake.session?.passport?.user;
    if (userId) {
      logger.info('user disconnected from socket', { userId });
      const sockets = store[userId] || [];
      store[userId] = sockets.filter((s) => s !== socket);
    }
  };

  const getSocketsForUserIds = (userIds: string[]) =>
    userIds.reduce<SocketWithPassportSession[]>(
      (acc, userId) => [...acc, ...(store[userId] || [])],
      []
    );

  return {
    addSocket,
    removeSocket,
    getSocketsForUserIds,
  };
};

export default socketStore;
