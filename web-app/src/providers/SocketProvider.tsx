import React, { useEffect, useState, createContext, useContext } from 'react';
import { io, Socket } from 'socket.io-client';
import { useUser } from '../hooks';
import { API_URL } from '../endpoints';
import { useSubscribeToSocketEvents } from '../hooks';

type SocketStatus = 'initial' | 'connecting' | 'connected' | 'disconnected';

interface SocketContextType {
  socket: Socket | null;
  status: SocketStatus;
  userId: string | null;
}

const initialSocketState: SocketContextType = {
  socket: null,
  status: 'initial',
  userId: null,
};

const SocketContext = createContext<SocketContextType>(initialSocketState);

interface SocketProviderProps {
  socketContext?: SocketContextType;
}

const SocketProvider: React.FC<SocketProviderProps> = ({
  children,
  socketContext: injectedSocketContext,
}) => {
  const { user } = useUser();
  const userId = user?.id;
  const [socketState, setSocketState] = useState(initialSocketState);
  const subscribe = useSubscribeToSocketEvents();

  useEffect(() => {
    if (injectedSocketContext || !userId || userId === socketState.userId) {
      return;
    }

    if (socketState.socket) {
      socketState.socket.disconnect();
    }

    const socket = io(API_URL, {
      withCredentials: true,
    });

    setSocketState({
      socket,
      status: 'connecting',
      userId,
    });

    socket.on('connect', () => {
      setSocketState({
        socket,
        status: 'connected',
        userId,
      });
    });

    socket.on('disconnect', () => {
      setSocketState({
        socket,
        status: 'disconnected',
        userId,
      });
    });

    subscribe(socket);
  }, [userId, injectedSocketContext, socketState, setSocketState, subscribe]);

  return (
    <SocketContext.Provider value={injectedSocketContext || socketState}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketStatus = () => useContext(SocketContext).status;

export default SocketProvider;
