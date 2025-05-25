import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';

import Leaderboard from './screens/LiveRaceScreen';
import KalenderScreen from './screens/Kalender';
import TeamsStandingScreen from './screens/TeamStanding';
import DriversStandingScreen from './screens/DriverStanding';

const Stack = createStackNavigator();

export default function Stilling() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <Stack.Navigator
        initialRouteName="Leaderboard"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Leaderboard" component={Leaderboard} />
        <Stack.Screen name="Kalender" component={KalenderScreen} />
        <Stack.Screen name="TeamStanding" component={TeamsStandingScreen} />
        <Stack.Screen name="DriverStanding" component={DriversStandingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
