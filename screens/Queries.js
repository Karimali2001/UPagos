import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';

const Queries = () => {
  const navigation = useNavigation();

  const [date, setDate] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDateSelect = selectedDate => {
    setDate(selectedDate);
    setShowCalendar(false); // Close the calendar after selecting a date
  };

  const handleButtonClick = () => {
    navigation.navigate('Payments', {
      data: date
    }); // Navigate to Payments, passing the selected date
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.pageTitle}>
          Consulta {'\n'}
          de Pagos {'\n'}
          por Fecha
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ingresa la fecha"
          value={date}
          required
        />
        <TouchableOpacity
          style={styles.calendarButton}
          onPress={() => setShowCalendar(true)}
        >
          <Ionicons name="calendar" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <Modal visible={showCalendar} animationType="slide">
        <View style={styles.modalContainer}>
          <Calendar
            onDayPress={day => handleDateSelect(day.dateString)}
            markedDates={{ [date]: { selected: true } }}
          />
        </View>
      </Modal>

      <TouchableOpacity style={styles.submitButton} onPress={handleButtonClick}>
        <Text style={styles.buttonText}>Consultar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#363062',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 50,
  },
  titleContainer: {
    width: '100%',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    width: '80%',
    height: 40,
    marginBottom: 10,
    marginTop: 30,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: '100%',
  },
  calendarButton: {
    paddingHorizontal: 10,
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
  submitButton: {
    backgroundColor: '#F99417', // Orange background color
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white', // White text color
    fontWeight: 'bold',
  },
});

export default Queries;
