import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { initSocket } from '../services/socket';

export default function LiveScreen({ route }) {
  const { deviceId } = route.params;
  const [status, setStatus] = useState('Disconnected');
  const [streamType, setStreamType] = useState(null);
  const socketRef = useRef(null);

  useEffect(() => {
    const socket = initSocket();
    socketRef.current = socket;

    socket.on('connect', () => {
      setStatus('Connected');
      socket.emit('join-room', `admin-${deviceId}`);
    });

    socket.on('offer', (data) => {
      // In real app, handle WebRTC offer here
      Alert.alert('Stream Started', 'Receiving simulated stream data');
    });

    return () => {
      // socket.disconnect(); // Keep alive for navigation
    };
  }, []);

  const requestStream = (type) => {
    if (socketRef.current) {
      socketRef.current.emit('request-stream', { deviceId, type });
      setStreamType(type);
      setStatus(`Requesting ${type}...`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Monitor: {deviceId}</Text>
      <Text style={styles.status}>Status: {status}</Text>

      <View style={styles.controls}>
        <Button title="Screen Share" onPress={() => requestStream('screen')} />
        <View style={{ height: 10 }} />
        <Button title="Listen In" color="green" onPress={() => requestStream('audio')} />
      </View>

      <View style={styles.viewer}>
        <Text style={styles.viewerText}>
          {streamType ? `Receiving ${streamType}...` : 'No Active Stream'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  status: {
    color: '#666',
    marginBottom: 20,
  },
  controls: {
    marginBottom: 30,
  },
  viewer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  viewerText: {
    color: '#fff',
  }
});
