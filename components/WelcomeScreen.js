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
    width: 100,  
    height: 100,
    marginBottom: 20,  
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,  // Increased margin to push the button further down
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
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default function WelcomeScreen({ navigation }) {

  const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) {
    return "Good Morning!\nWelcome to the Todo App!";
  } else if (hour < 15) {
    return "Good Afternoon!\nWelcome to the Todo App!";
  } else {
    return "Good Evening!\nWelcome to the Todo App!";
  }
};

  return (
    <View style={styles.container} accessible={true} accessibilityLabel="Welcome screen with logo, welcome text, and a start button">
     
      <Image
        source={require('../assets/logo.png')}  
        style={styles.logo}
        accessible={true}
        accessibilityLabel="Todo app logo"
      />
      
      <Text 
        style={styles.welcomeText} 
        accessible={true} 
        accessibilityLabel={getGreeting()}>
        {getGreeting()}
</Text>

      
      <TouchableOpacity
        style={styles.button}
        accessible={true}
        accessibilityLabel="Get started with the todo list"
        onPress={() => navigation.navigate('TodoList')}
      >
        <Text style={styles.buttonText} accessible={false}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}
