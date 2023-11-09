import React from 'react';
import { View,Text, StyleSheet } from 'react-native';

const RegisterVerification = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro Verificado</Text>
      <Text style={styles.message}>Su registro ha sido verificado con éxito.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default RegisterVerification;
