//pagina donde se ingresa la fecha y se le manda a la pagina de Payments
import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Calendar } from 'react-native-calendars'
import { useNavigation } from '@react-navigation/native'

const Queries = () => {
  const navigation = useNavigation()

  const [date, setDate] = useState('')
  const [showCalendar, setShowCalendar] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const handleDateSelect = (selectedDate) => {
    setDate(selectedDate.dateString)
    setShowCalendar(false)
  }

  const handleButtonClick = () => {
    if (date) {
      navigation.navigate('Payments', {
        data: date
      })
    } else {
      setShowModal(true)
    }
  }

  const closeModal = () => {
    setShowModal(false)
  }

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
        <TouchableOpacity
          style={styles.dateInput}
          onPress={() => setShowCalendar(true)}
        >
          <Text>{date || 'Ingrese la fecha'}</Text>
          <Ionicons name='calendar' size={24} color='black' />
        </TouchableOpacity>
      </View>

      <Modal visible={showCalendar} animationType='slide'>
        <View style={styles.modalContainer}>
          <Calendar
            onDayPress={handleDateSelect}
            markedDates={{ [date]: { selected: true } }}
          />
        </View>
      </Modal>

      <Modal visible={showModal} transparent animationType='slide'>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Por favor, ingrese la fecha antes de consultar.
            </Text>
            <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
              <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity style={styles.submitButton} onPress={handleButtonClick}>
        <Text style={styles.buttonText}>Consultar</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#363062',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 50
  },
  titleContainer: {
    width: '100%',
    alignItems: 'center'
  },
  inputContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    width: '80%',
    height: 40,
    marginBottom: 10,
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10
  },
  dateInput: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
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
    marginBottom: 20
  },
  submitButton: {
    backgroundColor: '#F99417',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center'
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center'
  },
  modalButton: {
    backgroundColor: '#F99417',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center'
  }
})

export default Queries
