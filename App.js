import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TodoList from './components/TodoList';
import SettingsScreen from './components/Setting';
import WelcomeScreen from './components/WelcomeScreen'; 
import Icon from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
        <TodoList isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        <View style={[styles.bottomBar, isDarkMode ? styles.darkBottomBar : styles.lightBottomBar]}>
          <TouchableOpacity 
            style={[styles.button, isDarkMode ? styles.darkButton : styles.lightButton]} 
            onPress={toggleTheme}
          >
            <Text style={[styles.buttonText, isDarkMode ? styles.darkButtonText : styles.lightButtonText]}>
              {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

export default function App() {
  return (
    
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen 
          name="Welcome" 
          component={WelcomeScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={({ navigation }) => ({
            title: 'To-Do App',
            headerLeft: () => (
              <TouchableOpacity 
                style={styles.headerIcon}
                onPress={() => navigation.navigate('Settings')}
              >
                <Icon name="settings-outline" size={25} color="#000" />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    borderColor: '#ADD8E6',
  },
  lightContainer: {
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  bottomBar: {
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lightBottomBar: {
    backgroundColor: '#f2f2f2',
  },
  darkBottomBar: {
    backgroundColor: '#333',
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  lightButton: {
    backgroundColor: '#f2f2f2',
  },
  darkButton: {
    backgroundColor: '#333',
  },
  buttonText: {
    fontSize: 16,
  },
  lightButtonText: {
    color: '#000',
  },
  darkButtonText: {
    color: '#fff',
  },
  settingsButton: {
    backgroundColor: '#007BFF',
  },
  headerIcon: {
    marginLeft: 15,
  },
});
