import { io, Socket } from 'socket.io-client';

// Emulator IP
const SOCKET_URL = 'http://10.0.2.2:3001';

let socket: Socket | null = null;

export const initSocket = () => {
  if (socket) return socket;
  socket = io(SOCKET_URL);
  return socket;
};

export const getSocket = () => socket;
