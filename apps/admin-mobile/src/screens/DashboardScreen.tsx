import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { api } from '../services/api';
import { theme } from '../theme';

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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Dashboard</Text>
        <TouchableOpacity onPress={loadData}>
            <Text style={styles.link}>Refresh</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        contentContainerStyle={styles.list}
        data={locations}
        keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Text style={styles.device}>{item.deviceId}</Text>
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>Online</Text>
                </View>
            </View>

            <View style={styles.infoRow}>
                <Text style={styles.label}>Location:</Text>
                <Text style={styles.value}>{item.latitude.toFixed(4)}, {item.longitude.toFixed(4)}</Text>
            </View>

            <Text style={styles.time}>Updated: {new Date(item.timestamp).toLocaleTimeString()}</Text>

            <TouchableOpacity
                style={styles.actionButton}
                onPress={() => navigation.navigate('Live', { deviceId: item.deviceId })}
            >
                <Text style={styles.actionButtonText}>Monitor Live</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <View style={styles.nav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Geofence')}>
            <Text style={styles.navText}>Geofences</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Usage')}>
            <Text style={styles.navText}>App Usage</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, styles.logout]} onPress={handleLogout}>
            <Text style={[styles.navText, { color: theme.colors.danger }]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: theme.spacing.l,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  link: {
      color: theme.colors.primary,
      fontWeight: '600',
  },
  list: {
      padding: theme.spacing.m,
  },
  card: {
    backgroundColor: theme.colors.card,
    padding: theme.spacing.m,
    borderRadius: theme.borderRadius,
    marginBottom: theme.spacing.m,
    ...theme.shadow,
  },
  cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.spacing.m,
  },
  device: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  badge: {
      backgroundColor: '#d1fae5',
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 10,
  },
  badgeText: {
      color: '#065f46',
      fontSize: 12,
      fontWeight: 'bold',
  },
  infoRow: {
      flexDirection: 'row',
      marginBottom: 4,
  },
  label: {
      color: theme.colors.textSecondary,
      marginRight: 8,
  },
  value: {
      color: theme.colors.text,
      fontWeight: '500',
  },
  time: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    marginBottom: theme.spacing.m,
  },
  actionButton: {
      backgroundColor: theme.colors.primary,
      padding: theme.spacing.s,
      borderRadius: 6,
      alignItems: 'center',
  },
  actionButtonText: {
      color: '#fff',
      fontWeight: '600',
  },
  nav: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    backgroundColor: '#fff',
    paddingVertical: theme.spacing.m,
  },
  navItem: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: theme.spacing.s,
  },
  navText: {
      fontWeight: '600',
      color: theme.colors.textSecondary,
  },
  logout: {
      borderLeftWidth: 1,
      borderLeftColor: theme.colors.border,
  }
});
