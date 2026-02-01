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

    const socket = io('http://localhost:3001');
    socketRef.current = socket;

    socket.on('connect', () => {
      setStatus('Connected');
      socket.emit('join-room', `parent-${deviceId}`);
    });

    socket.on('offer', async (data) => {
      console.log('Received offer from child');
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
    <div className="max-w-7xl mx-auto px-6 font-sans">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Live Monitor</h1>
        <div className="flex items-center gap-2 mt-1">
            <span className={`h-2.5 w-2.5 rounded-full ${status === 'Connected' ? 'bg-green-500' : 'bg-red-500'}`}></span>
            <p className="text-gray-500">Device: <span className="font-medium text-gray-900">{deviceId}</span></p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50 flex gap-4">
           <button
            onClick={() => requestStream('screen')}
            className="px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm"
          >
            Start Screen Share
          </button>
          <button
            onClick={() => requestStream('audio')}
            className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-sm"
          >
            Listen In
          </button>
          <div className="ml-auto text-sm text-gray-500 self-center">
            Status: <span className="font-medium text-gray-900">{status}</span>
          </div>
        </div>

        <div className="aspect-video bg-black flex items-center justify-center relative">
            {streamType ? (
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                    <p className="text-gray-400">Waiting for {streamType} stream...</p>
                    <p className="text-xs text-gray-600 mt-2">(WebRTC Simulation)</p>
                </div>
            ) : (
                <div className="text-center text-gray-500">
                    <p>Select a mode to start streaming</p>
                </div>
            )}

            {/* Overlay */}
            <div className="absolute top-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                LIVE
            </div>
        </div>
      </div>
    </div>
  );
};

export default LiveView;
