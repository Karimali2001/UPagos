// Register.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Register = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Register Screen</Text>
      {/* Other content for the Register screen */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black', // You can change the color to 'black' or '#000' if needed
  },
});

export default Register;
