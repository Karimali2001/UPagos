//page where you put your bank account information
//for payment verification
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const Configuration = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>
        Datos del {'\n'}
        Pago Móvil
      </Text>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Ingresa el número de telefono" />
        <TextInput style={styles.input} placeholder="Ingresa el número de cédula" />
        <TextInput style={styles.input} placeholder="Ingresa el nombre del banco" />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  pageTitle: {
    color: '#F99417',
    fontSize: 36,
    fontWeight: '700',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    paddingTop: 0,
    marginBottom: 20,
  },
  inputContainer: {
    backgroundColor: '#363062',
    borderRadius: 15,
    padding: 20,
    width: '100%',
    marginTop: 50,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    height: 40,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#363062',
    padding: 15,
    alignItems: 'center',
    borderRadius: 15,
    width: '90%', // Adjust the width to make the button wider
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Configuration;
