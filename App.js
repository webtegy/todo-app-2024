import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingPage from './screens/landing/Landing';
import BottomTabNavigator from './navigators/BottomTabNavigator';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import LandingManageTask from './screens/landing/LandingManageTask';
import LandingDaily from './screens/landing/LandingDaily';
import LandingOrganize from './screens/landing/LandingOrganize';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StoreProvider } from './store/store';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <StoreProvider>
        <ApplicationProvider {...eva} theme={eva.dark}>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="LandingPage" component={LandingPage} />
              <Stack.Screen name="LandingManageTaskPage" component={LandingManageTask} />
              <Stack.Screen name="LandingDaily" component={LandingDaily} />
              <Stack.Screen name="LandingOrganize" component={LandingOrganize} />
              <Stack.Screen name="Main" component={BottomTabNavigator} />
            </Stack.Navigator>
          </NavigationContainer>
        </ApplicationProvider>
      </StoreProvider>
    </SafeAreaProvider>
  );
}