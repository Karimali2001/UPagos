import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Register from './Register';
import RegisterVerification from './RegisterVerification';

const Stack = createStackNavigator();

const RegisterNavigator = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="RegisterVerification" component={RegisterVerification} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RegisterNavigator;
