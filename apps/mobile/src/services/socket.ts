import { io, Socket } from 'socket.io-client';

// Use correct IP address for your environment
// Android Emulator: 10.0.2.2
const SOCKET_URL = 'http://192.168.1.100:3001';

let socket: Socket | null = null;

export const initSocket = (deviceId: string) => {
  if (socket) return socket;

  socket = io(SOCKET_URL);

  socket.on('connect', () => {
    console.log('Connected to socket server');
    socket?.emit('join-room', deviceId);
  });

  return socket;
};

export const getSocket = () => socket;
