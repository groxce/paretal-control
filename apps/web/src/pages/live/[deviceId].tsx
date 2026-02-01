import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { io, Socket } from 'socket.io-client';

const LiveView = () => {
  const router = useRouter();
  const { deviceId } = router.query;
  const socketRef = useRef<Socket | null>(null);
  const [status, setStatus] = useState('Disconnected');
  const [streamType, setStreamType] = useState<string | null>(null);

  useEffect(() => {
    if (!deviceId) return;

    // Connect to Socket.io Server
    const socket = io('http://localhost:3001');
    socketRef.current = socket;

    socket.on('connect', () => {
      setStatus('Connected');
      socket.emit('join-room', `parent-${deviceId}`); // Parent joins a separate room to avoid echo?
      // Actually, standard WebRTC signaling happens via the server routing messages.
    });

    socket.on('offer', async (data) => {
      console.log('Received offer from child');
      // In a real app:
      // 1. Create RTCPeerConnection
      // 2. Set Remote Description (offer)
      // 3. Create Answer
      // 4. Set Local Description
      // 5. Emit 'answer' back to child
    });

    return () => {
      socket.disconnect();
    };
  }, [deviceId]);

  const requestStream = (type: 'screen' | 'audio') => {
    if (socketRef.current && deviceId) {
      socketRef.current.emit('request-stream', { deviceId, type });
      setStreamType(type);
      setStatus(`Requesting ${type} stream...`);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Live Monitor: {deviceId}</h1>
      <p>Status: <strong>{status}</strong></p>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button
          onClick={() => requestStream('screen')}
          style={{ padding: '10px 20px', backgroundColor: '#0070f3', color: '#fff', border: 'none', cursor: 'pointer' }}
        >
          Start Screen Share
        </button>
        <button
          onClick={() => requestStream('audio')}
          style={{ padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', cursor: 'pointer' }}
        >
          Listen In (One-Way Audio)
        </button>
      </div>

      <div style={{
        width: '640px',
        height: '360px',
        backgroundColor: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff'
      }}>
        {streamType ? `Waiting for ${streamType} stream... (WebRTC Simulation)` : 'No active stream'}
        {/* <video autoPlay playsInline muted /> */}
      </div>
    </div>
  );
};

export default LiveView;
