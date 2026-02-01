import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import { api } from '../services/api';

export default function DashboardScreen({ navigation }) {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await api.getLocations();
      setLocations(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
      await api.logout();
      navigation.replace('Login');
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Child Locations</Text>
        <Button title="Refresh" onPress={loadData} />
      </View>

      <FlatList
        data={locations}
        keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.device}>{item.deviceId}</Text>
            <Text>Lat: {item.latitude}, Lon: {item.longitude}</Text>
            <Text style={styles.time}>{new Date(item.timestamp).toLocaleString()}</Text>
          </View>
        )}
      />

      <View style={styles.nav}>
        <Button title="Geofences" onPress={() => navigation.navigate('Geofence')} />
        <Button title="App Usage" onPress={() => navigation.navigate('Usage')} />
        <Button title="Logout" color="red" onPress={handleLogout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  device: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  time: {
    color: '#666',
    fontSize: 12,
    marginTop: 5,
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  }
});
