import { Server, Socket } from 'socket.io';
import { Server as HttpServer } from 'http';

export const initSocket = (httpServer: HttpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: '*', // Allow all origins for this demo
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket: Socket) => {
    console.log('User connected:', socket.id);

    // Join a specific room based on deviceId
    socket.on('join-room', (deviceId: string) => {
      socket.join(deviceId);
      console.log(`Socket ${socket.id} joined room ${deviceId}`);
    });

    // Signaling Data: Offer (from Parent)
    socket.on('offer', (data: { deviceId: string, offer: any }) => {
      socket.to(data.deviceId).emit('offer', {
        offer: data.offer,
        senderId: socket.id
      });
    });

    // Signaling Data: Answer (from Child)
    socket.on('answer', (data: { targetId: string, answer: any }) => {
      socket.to(data.targetId).emit('answer', {
        answer: data.answer,
        senderId: socket.id
      });
    });

    // Signaling Data: ICE Candidate
    socket.on('ice-candidate', (data: { targetId: string, candidate: any }) => {
      socket.to(data.targetId).emit('ice-candidate', {
        candidate: data.candidate,
        senderId: socket.id
      });
    });

    // Commands (Parent -> Child)
    socket.on('request-stream', (data: { deviceId: string, type: 'screen' | 'audio' }) => {
      console.log(`Requesting ${data.type} stream from ${data.deviceId}`);
      io.to(data.deviceId).emit('start-stream', {
        type: data.type,
        requesterId: socket.id
      });
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

  return io;
};
