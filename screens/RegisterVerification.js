import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterVerification = () => {
  const navigation = useNavigation();
  const [date, setDate] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);

  const [referenciaValue, setReferenciaValue] = useState('');
  const [telefonoValue, setTelefonoValue] = useState('');
  const [montoValue, setMontoValue] = useState('');

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setDate(today);
  }, []);

  const handleInputChange = value => {
    setDate(value);
  };

  const handleDateSelect = selectedDate => {
    setDate(selectedDate);
    setShowCalendar(false);
  };

  const goBack = () => {
    navigation.goBack();
  };

  const submitPayment = async () => {
    // Save payment details to AsyncStorage
    const paymentDetails = {
      date,
      referencia: referenciaValue,
      telefono: telefonoValue,
      monto: montoValue,
    };

    try {
      // Fetch existing payments from AsyncStorage
      const existingPaymentsJSON = await AsyncStorage.getItem('payments');
      const existingPayments = existingPaymentsJSON ? JSON.parse(existingPaymentsJSON) : [];

      // Add the new payment to the list
      existingPayments.push(paymentDetails);

      // Save the updated list back to AsyncStorage
      await AsyncStorage.setItem('payments', JSON.stringify(existingPayments));

      // Navigate to the success screen
      navigation.navigate('Success');
    } catch (error) {
      console.error('Error saving payment to AsyncStorage:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro de Pago</Text>

      <View style={{ width: '80%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <TextInput
          style={styles.dateInput}
          placeholder="Fecha de Pago"
          value={date}
          onChangeText={handleInputChange}
          onTouchStart={() => setShowCalendar(true)}
        />
        <TouchableOpacity onPress={() => setShowCalendar(true)} style={{ alignItems: 'center' }}>
          <Ionicons name="calendar" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.tableContainer}>
        <Text style={styles.tableTitle}>Detalles de Pago</Text>
        <View style={styles.tableRow}>
          <Text style={styles.tableLeftTitle}>Referencia:</Text>
          <TextInput
            style={styles.tableRightItem}
            value={referenciaValue}
            onChangeText={text => setReferenciaValue(text)}
            placeholder="Ingrese la referencia"
          />
        </View>
        <View style={styles.tableRowAlternate}>
          <Text style={styles.tableLeftTitle}>Nro. Teléfono:</Text>
          <TextInput
            style={styles.tableRightItem}
            value={telefonoValue}
            onChangeText={text => setTelefonoValue(text)}
            placeholder="Ingrese el nro. de teléfono"
          />
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableLeftTitle}>Monto (Bs):</Text>
          <TextInput
            style={styles.tableRightItem}
            value={montoValue}
            onChangeText={text => setMontoValue(text)}
            placeholder="Ingrese el monto"
          />
        </View>
      </View>

      <Modal visible={showCalendar} animationType="slide">
        <View style={styles.modalContainer}>
          <Calendar
            onDayPress={day => handleDateSelect(day.dateString)}
            markedDates={{ [date]: { selected: true } }}
          />
        </View>
      </Modal>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.submitButton} onPress={goBack}>
          <Text style={styles.buttonText}>Volver</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitButton} onPress={submitPayment}>
          <Text style={styles.buttonText}>Registrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8280A3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
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
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20, // Margin on the sides
    marginBottom: 10,
  },
  dateInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#F5F5F5', // Background color
    marginRight: 10,
  },
  tableContainer: {
    backgroundColor: '#C4C3CF',
    padding: 10,
    marginTop: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tableTitle: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 8,
    width: '80%', // Set the width to 100%
  },
  tableRowAlternate: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
    backgroundColor: '#C4C3CF',
    padding: 10,
    borderRadius: 8,
    width: '80%', // Set the width to 100%
  },
  tableLeftTitle: {
    color: 'black',
    fontWeight: 'bold',
    flex: 1,
    paddingRight: 10,
  },
  tableRightItem: {
    color: 'black',
    flex: 2,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  submitButton: {
    backgroundColor: '#363062',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 20,
  },
});

export default RegisterVerification;
