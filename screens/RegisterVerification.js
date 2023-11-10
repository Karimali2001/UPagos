import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';

const RegisterVerification = () => {
  const navigation = useNavigation();
  const [date, setDate] = useState(''); // State for the selected date
  const [showCalendar, setShowCalendar] = useState(false);

  // Function to set today's date as default when the component mounts
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]; // Get today's date
    setDate(today);
  }, []);

  const handleInputChange = value => {
    setDate(value);
  };

  const handleDateSelect = selectedDate => {
    setDate(selectedDate);
    setShowCalendar(false); // Close the calendar after selecting a date
  };

  const goBack = () => {
    navigation.goBack(); // Navigate back to the previous screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro de Pago</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.dateInput}
          placeholder="Fecha de Pago"
          value={date}
          onChangeText={handleInputChange}
          onTouchStart={() => setShowCalendar(true)} // Show calendar on touch
        />
        <TouchableOpacity onPress={() => setShowCalendar(true)}>
          <Ionicons name="calendar" size={24} color="#F99417" />
        </TouchableOpacity>
      </View>

      <Text style={styles.tableTitle}>Detalle de Pago</Text>
      <View style={styles.tableRow}>
        <Text style={styles.tableLeftTitle}>Referencia:</Text>
        <Text style={styles.tableRightItem}>[Referencia Value]</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.tableLeftTitle}>Nro. Teléfono:</Text>
        <Text style={styles.tableRightItem}>[Nro. Teléfono Value]</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.tableLeftTitle}>Monto:</Text>
        <Text style={styles.tableRightItem}>[Monto Value]</Text>
      </View>

      <Modal visible={showCalendar} animationType="slide">
        <View style={styles.modalContainer}>
          <Calendar
            onDayPress={day => handleDateSelect(day.dateString)}
            markedDates={{ [date]: { selected: true } }}
          />
        </View>
      </Modal>

      <TouchableOpacity style={styles.submitButton} onPress={goBack}>
        <Text style={styles.buttonText}>Volver</Text>
      </TouchableOpacity>
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
    fontSize: 24,
    fontWeight: 'bold',
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
  tableTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  tableLeftTitle: {
    color: '#F99417',
    fontWeight: 'bold',
    flex: 1,
    paddingRight: 10,
  },
  tableRightItem: {
    color: '#fff',
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
});

export default RegisterVerification;
