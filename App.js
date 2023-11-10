import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Import your screens
import Configuration from './screens/Configuration';
import RegisterNavigator from './screens/RegisterNavigator';
import QueryNavigator from './screens/QueryNavigator';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Configuración') {
              iconName = focused ? 'settings' : 'settings-outline';
            } else if (route.name === 'Consultar Pago') {
              iconName = focused ? 'md-search' : 'md-search';
            } else if (route.name === 'Registrar Pago') {
              iconName = focused ? 'camera' : 'camera-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#F99417',
          tabBarInactiveTintColor: '#F5F5F5',
          tabBarStyle: {
            backgroundColor: '#363062', // Set the background color of the bottom tab bar
          },
          cardStyle: {
            backgroundColor: '#F5F5F5',
          },
        })}
      >
        <Tab.Screen name="Configuración" component={Configuration} />
        <Tab.Screen name="Consultar Pago" component={QueryNavigator} />
        <Tab.Screen name="Registrar Pago" component={RegisterNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
