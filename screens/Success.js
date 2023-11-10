//page for if the payment was successfully registered.
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Success = () => {
  return (
    <View style={styles.container}>
      <Ionicons name="checkmark-circle-outline" size={100} color="#32CD32" />
      <Text style={styles.successMessage}>Payment Registered Successfully!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  successMessage: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#32CD32',
    marginTop: 20,
  },
});

export default Success;
