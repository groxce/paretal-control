import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getSocket } from '../services/socket';

interface Props {
  deviceId: string;
}

// NOTE: In a real React Native app, you would use 'react-native-webrtc'
// to capture MediaStream from Screen or Microphone.
// Since we cannot run native modules here, this is a simulation.

export default function StreamService({ deviceId }: Props) {
  const [streamingType, setStreamingType] = useState<'screen' | 'audio' | null>(null);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    socket.on('start-stream', (data: { type: 'screen' | 'audio', requesterId: string }) => {
      console.log(`Received start-stream request: ${data.type}`);
      setStreamingType(data.type);
      startWebRTC(data.type, data.requesterId);
    });

    return () => {
      socket.off('start-stream');
    };
  }, []);

  const startWebRTC = (type: 'screen' | 'audio', requesterId: string) => {
    // 1. Create RTCPeerConnection (Simulated)
    console.log(`Starting ${type} capture...`);

    // 2. Get User Media (Simulated)
    // const stream = await mediaDevices.getUserMedia({ ... });

    // 3. Create Offer
    const mockOffer = { type: 'offer', sdp: 'mock-sdp-data' };

    // 4. Send Offer via Socket
    const socket = getSocket();
    socket?.emit('offer', { deviceId: requesterId, offer: mockOffer });

    console.log(`Offer sent to ${requesterId}`);
  };

  if (!streamingType) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        🔴 {streamingType === 'screen' ? 'Screen Sharing' : 'Audio Streaming'} Active
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: 'rgba(255, 0, 0, 0.8)',
    padding: 10,
    borderRadius: 20,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  }
});
