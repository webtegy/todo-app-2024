import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TodoListScreen from '../screens/app/TodoListScreen';
// import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#e91e63',
      }}
    >
      <Tab.Screen
        name="Home"
        component={TodoListScreen}
        options={{ tabBarLabel: 'Home' }}
      />
      {/* <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ tabBarLabel: 'Settings' }}
      /> */}
    </Tab.Navigator>
  );
}
