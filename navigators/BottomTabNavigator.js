import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TodoListScreen from '../screens/app/TodoListScreen';
import DashboardScreen from '../screens/app/DashboardScreen';
import { DarkTheme } from '@react-navigation/native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: DarkTheme.colors.card,
          borderTopColor: 'transparent',
        },
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#888888',
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="dashboard" size={26} color={color} />
          ),
        }}
        
      />

      <Tab.Screen
        name="Todo"
        component={TodoListScreen}
        options={{
          tabBarLabel: 'Todo',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="tasks" size={26} color={color} />
          ),
        }}
      />
      
      <Tab.Screen
        name="Profile"
        component={TodoListScreen}
        options={{ tabBarLabel: 'Profile' }}
      />
    
    </Tab.Navigator>
  );
}
