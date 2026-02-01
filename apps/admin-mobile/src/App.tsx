import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import GeofenceScreen from './screens/GeofenceScreen';
import UsageScreen from './screens/UsageScreen';
import LiveScreen from './screens/LiveScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Geofence" component={GeofenceScreen} />
        <Stack.Screen name="Usage" component={UsageScreen} />
        <Stack.Screen name="Live" component={LiveScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
