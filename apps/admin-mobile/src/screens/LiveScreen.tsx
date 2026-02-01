import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { initSocket } from '../services/socket';
import { theme } from '../theme';

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
      Alert.alert('Stream Started', 'Receiving simulated stream data');
    });

    return () => {};
  }, []);

  const requestStream = (type) => {
    if (socketRef.current) {
      socketRef.current.emit('request-stream', { deviceId, type });
      setStreamType(type);
      setStatus(`Requesting ${type}...`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
          <Text style={styles.title}>Live Monitor</Text>
          <View style={styles.badge}>
             <Text style={styles.badgeText}>{deviceId}</Text>
          </View>
      </View>

      <View style={styles.viewerContainer}>
          <View style={styles.viewer}>
            <Text style={styles.viewerText}>
            {streamType ? (
                `Receiving ${streamType} stream...`
            ) : (
                'Select a mode to start streaming'
            )}
            </Text>
            {streamType && <Text style={styles.subText}>(WebRTC Simulation)</Text>}
          </View>
          <View style={styles.statusBadge}>
              <Text style={styles.statusText}>{status}</Text>
          </View>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.button} onPress={() => requestStream('screen')}>
            <Text style={styles.buttonText}>Start Screen Share</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.audioButton]} onPress={() => requestStream('audio')}>
            <Text style={styles.buttonText}>Listen In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.m,
  },
  header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.spacing.l,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  badge: {
      backgroundColor: theme.colors.border,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 4,
  },
  badgeText: {
      fontWeight: '600',
      color: theme.colors.textSecondary,
  },
  viewerContainer: {
      flex: 1,
      marginBottom: theme.spacing.l,
      position: 'relative',
  },
  viewer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.borderRadius,
    ...theme.shadow,
  },
  viewerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  subText: {
      color: '#666',
      fontSize: 12,
      marginTop: 8,
  },
  statusBadge: {
      position: 'absolute',
      top: 10,
      right: 10,
      backgroundColor: 'rgba(0,0,0,0.6)',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 4,
  },
  statusText: {
      color: '#fff',
      fontSize: 10,
      fontWeight: 'bold',
  },
  controls: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
      flex: 1,
      backgroundColor: theme.colors.primary,
      padding: theme.spacing.m,
      borderRadius: 8,
      alignItems: 'center',
  },
  audioButton: {
      backgroundColor: theme.colors.success,
  },
  buttonText: {
      color: '#fff',
      fontWeight: 'bold',
  }
});
