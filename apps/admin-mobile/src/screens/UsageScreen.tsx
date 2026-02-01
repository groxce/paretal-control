import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { api } from '../services/api';
import { theme } from '../theme';

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
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>App Usage</Text>

      <FlatList
        contentContainerStyle={styles.list}
        data={usage}
        keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={styles.row}>
              <Text style={styles.app}>{item.appName}</Text>
              <View style={styles.durationBadge}>
                <Text style={styles.duration}>{item.duration} min</Text>
              </View>
            </View>
            <View style={styles.metaRow}>
                <Text style={styles.meta}>{item.deviceId}</Text>
                <Text style={styles.meta}>{item.date}</Text>
            </View>
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.s,
  },
  app: {
    fontWeight: 'bold',
    fontSize: 16,
    color: theme.colors.text,
  },
  durationBadge: {
      backgroundColor: '#eff6ff',
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 12,
  },
  duration: {
    fontWeight: 'bold',
    color: theme.colors.primary,
    fontSize: 12,
  },
  metaRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
  },
  meta: {
    color: theme.colors.textSecondary,
    fontSize: 12,
  }
});
