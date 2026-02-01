import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { api } from '../services/api';
import { theme } from '../theme';

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
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Geofences</Text>

      <View style={styles.form}>
        <Text style={styles.sectionTitle}>Add New Zone</Text>
        <TextInput
            placeholder="Name (e.g., Home)"
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholderTextColor={theme.colors.textSecondary}
        />
        <View style={styles.row}>
          <TextInput
            placeholder="Lat"
            style={[styles.input, styles.half]}
            value={lat}
            onChangeText={setLat}
            keyboardType="numeric"
            placeholderTextColor={theme.colors.textSecondary}
          />
          <TextInput
            placeholder="Lon"
            style={[styles.input, styles.half]}
            value={lon}
            onChangeText={setLon}
            keyboardType="numeric"
            placeholderTextColor={theme.colors.textSecondary}
          />
        </View>
        <TextInput
            placeholder="Radius (m)"
            style={styles.input}
            value={radius}
            onChangeText={setRadius}
            keyboardType="numeric"
            placeholderTextColor={theme.colors.textSecondary}
        />
        <TouchableOpacity style={styles.button} onPress={handleAdd}>
            <Text style={styles.buttonText}>Add Geofence</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        contentContainerStyle={styles.list}
        data={geofences}
        keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={styles.itemHeader}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.radius}>{item.radius}m</Text>
            </View>
            <Text style={styles.coords}>{item.latitude.toFixed(4)}, {item.longitude.toFixed(4)}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.m,
    backgroundColor: theme.colors.background,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: theme.spacing.m,
    color: theme.colors.text,
  },
  sectionTitle: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: theme.spacing.m,
      color: theme.colors.text,
  },
  form: {
    marginBottom: theme.spacing.l,
    padding: theme.spacing.m,
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius,
    ...theme.shadow,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.m,
    marginBottom: theme.spacing.m,
    borderRadius: 8,
    backgroundColor: '#fff',
    color: theme.colors.text,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  half: {
    width: '48%',
  },
  button: {
      backgroundColor: theme.colors.primary,
      padding: theme.spacing.m,
      borderRadius: 8,
      alignItems: 'center',
  },
  buttonText: {
      color: '#fff',
      fontWeight: 'bold',
  },
  list: {
      paddingBottom: theme.spacing.xl,
  },
  item: {
    padding: theme.spacing.m,
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius,
    marginBottom: theme.spacing.m,
    ...theme.shadow,
  },
  itemHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 4,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    color: theme.colors.text,
  },
  radius: {
      color: theme.colors.primary,
      fontWeight: '600',
  },
  coords: {
      color: theme.colors.textSecondary,
  }
});
