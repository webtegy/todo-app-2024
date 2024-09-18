import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  logo: {
    width: 100,  // Adjust the size as needed
    height: 100,
    marginBottom: 20,  // Space between logo and welcome text
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  // Increased margin to push the button further down
    color: '#333',
  },
  button: {
    backgroundColor: '#5A0079',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 40,  // Adjust to move the button down
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  
});

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Add the logo here */}
      
      <Image
        source={require('../assets/logo.png')}  // Replace with the correct path to your logo
        style={styles.logo}
      />
      
      <Text style={styles.welcomeText}>Welcome to the Todo App!</Text>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('TodoList')}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}
