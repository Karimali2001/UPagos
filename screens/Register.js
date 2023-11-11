import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { useNavigation } from '@react-navigation/native'

const Register = () => {
  const [inputType, setInputType] = useState('camera')
  const navigation = useNavigation()

  const handleInputChange = (newInputType) => {
    setInputType(newInputType)
  }

  const handleSubmit = () => {
    if (inputType === 'manual') {
      navigation.navigate('RegisterVerification') // Navigate to RegisterVerification if manual is selected
    } else if (inputType === 'camera') {
      // Handle camera input
      navigation.navigate('RegisterWithCamera')
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      <Text style={styles.description}>
        Seleccione un método para registrar el pago
      </Text>

      <Picker
        selectedValue={inputType}
        onValueChange={handleInputChange}
        style={styles.picker}
        itemStyle={styles.pickerItem}
        labelStyle={styles.pickerLabel}
      >
        <Picker.Item label='Manual' value='manual' />
        <Picker.Item label='Cámara' value='camera' />
      </Picker>

      <TouchableOpacity
        style={{ ...styles.submitButton, backgroundColor: '#363062' }}
        onPress={handleSubmit}
      >
        <Text style={styles.submitText}>Siguiente</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8280A3',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    color: '#F99417',
    fontSize: 36,
    fontWeight: '700',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    paddingTop: 0
  },
  description: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
    textAlign: 'center',
    margin: 5
  },
  picker: {
    width: 200,
    borderWidth: 1,
    borderColor: '#363062',
    padding: 10,
    backgroundColor: '#C4C3CF',
    borderRadius: 8
  },
  pickerLabel: {
    color: '#F99417'
  },
  submitButton: {
    padding: 10,
    marginTop: 20,
    borderRadius: 8
  },
  submitText: {
    color: '#fff',
    padding: 10
  }
})

export default Register
