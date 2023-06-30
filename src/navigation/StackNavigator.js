import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import SingleScreen from '../screens/singleScreen';
import HomeScreen from '../screens/homeScreen';
import ExploreScreen from '../screens/exploreScreen';

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Single" component={SingleScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Explore" component={ExploreScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Tabs" component={TabNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
