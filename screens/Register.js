import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import {Picker} from '@react-native-picker/picker';

const Register = () => {
  const [inputType, setInputType] = useState('manual');

  const handleInputChange = (newInputType) => {
    setInputType(newInputType);
  };

  const handleSubmit = () => {
    // Handle submit action based on the selected input type
    if (inputType === 'manual') {
      // Handle manual input
    } else if (inputType === 'camera') {
      // Handle camera input
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>

      <Picker
        selectedValue={inputType}
        onValueChange={handleInputChange}
        style={styles.picker}
      >
        <Picker.Item label="Entrada manual" value="manual" />
        <Picker.Item label="Entrada de cámara" value="camera" />
      </Picker>

      <Button title="Registrar" onPress={handleSubmit} style={styles.submitButton} />
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
  picker: {
    width: 200,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  submitButton: {
    backgroundColor: '#363062',
    color: '#fff',
    padding: 10,
    marginTop: 20,
  },
});

export default Register;
