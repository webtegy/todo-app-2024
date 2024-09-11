import React from 'react';
import { View, Text, Button } from 'react-native';

export default function LandingPage({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to the Landing Page</Text>
      <Button
        title="Go to Main App"
        onPress={() => navigation.replace('Main')}
      />
    </View>
  );
}
