import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Configuration = () => {
  // State to manage input values
  const [phoneNumber, setPhoneNumber] = useState('');
  const [cedula, setCedula] = useState('');
  const [bankName, setBankName] = useState('');

  useEffect(() => {
    // Load saved data when the component mounts
    loadSavedData();
  }, []);

  const loadSavedData = async () => {
    try {
      // Load data from AsyncStorage
      const savedPhoneNumber = await AsyncStorage.getItem('phoneNumber');
      const savedCedula = await AsyncStorage.getItem('cedula');
      const savedBankName = await AsyncStorage.getItem('bankName');

      // Update state with saved data
      if (savedPhoneNumber) setPhoneNumber(savedPhoneNumber);
      if (savedCedula) setCedula(savedCedula);
      if (savedBankName) setBankName(savedBankName);
    } catch (error) {
      console.error('Error loading data from AsyncStorage:', error);
    }
  };

  const saveData = async () => {
    try {
      // Save data to AsyncStorage
      await AsyncStorage.setItem('phoneNumber', phoneNumber);
      await AsyncStorage.setItem('cedula', cedula);
      await AsyncStorage.setItem('bankName', bankName);
      console.log('Data saved successfully!');
    } catch (error) {
      console.error('Error saving data to AsyncStorage:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>
        Ingresa tus {'\n'}
        Datos de {'\n'}
        Pago Móvil
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ingresa el número de telefono"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <TextInput
          style={styles.input}
          placeholder="Ingresa el número de cédula"
          value={cedula}
          onChangeText={setCedula}
        />
        <TextInput
          style={styles.input}
          placeholder="Ingresa el nombre del banco"
          value={bankName}
          onChangeText={setBankName}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={saveData}>
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
    backgroundColor: '#8280A3',
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
