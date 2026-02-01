import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { api } from '../services/api';

export default function UsageScreen() {
  const [usage, setUsage] = useState([]);

  useEffect(() => {
    loadUsage();
  }, []);

  const loadUsage = async () => {
    try {
      const data = await api.getAppUsage();
      setUsage(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>App Usage History</Text>

      <FlatList
        data={usage}
        keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={styles.row}>
              <Text style={styles.app}>{item.appName}</Text>
              <Text style={styles.duration}>{item.duration} mins</Text>
            </View>
            <Text style={styles.meta}>{item.deviceId} - {item.date}</Text>
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
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  app: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  duration: {
    fontWeight: 'bold',
    color: '#0070f3',
  },
  meta: {
    color: '#666',
    fontSize: 12,
  }
});
