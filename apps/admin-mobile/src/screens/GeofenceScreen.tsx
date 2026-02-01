import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Button, Alert } from 'react-native';
import { api } from '../services/api';

export default function GeofenceScreen() {
  const [geofences, setGeofences] = useState([]);
  const [name, setName] = useState('');
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [radius, setRadius] = useState('');

  useEffect(() => {
    loadGeofences();
  }, []);

  const loadGeofences = async () => {
    try {
      const data = await api.getGeofences();
      setGeofences(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdd = async () => {
    try {
      await api.addGeofence({
        name,
        latitude: parseFloat(lat),
        longitude: parseFloat(lon),
        radius: parseFloat(radius)
      });
      setName('');
      setLat('');
      setLon('');
      setRadius('');
      loadGeofences();
    } catch (error) {
      Alert.alert('Error', 'Failed to add geofence');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Manage Geofences</Text>

      <View style={styles.form}>
        <TextInput placeholder="Name" style={styles.input} value={name} onChangeText={setName} />
        <View style={styles.row}>
          <TextInput placeholder="Lat" style={[styles.input, styles.half]} value={lat} onChangeText={setLat} keyboardType="numeric" />
          <TextInput placeholder="Lon" style={[styles.input, styles.half]} value={lon} onChangeText={setLon} keyboardType="numeric" />
        </View>
        <TextInput placeholder="Radius (m)" style={styles.input} value={radius} onChangeText={setRadius} keyboardType="numeric" />
        <Button title="Add Geofence" onPress={handleAdd} />
      </View>

      <FlatList
        data={geofences}
        keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>Lat: {item.latitude}, Lon: {item.longitude}</Text>
            <Text>Radius: {item.radius}m</Text>
          </View>
        )}
      />
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
    marginBottom: 15,
  },
  form: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  half: {
    width: '48%',
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  }
});
