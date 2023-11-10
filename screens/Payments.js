import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Payments = ({ route, navigation }) => {
  const data = route.params.data;
  const selectedDate = moment(data).format('YYYY-MM-DD');

  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        // Fetch payments from AsyncStorage
        const paymentsData = await AsyncStorage.getItem('payments');
        if (paymentsData) {
          const allPayments = JSON.parse(paymentsData);

          // Filter payments for the selected date
          const filteredPayments = allPayments.filter(payment =>
            moment(payment.date).isSame(selectedDate, 'day')
          );

          setPayments(filteredPayments);
        }
      } catch (error) {
        console.error('Error fetching payments from AsyncStorage:', error);
      }
    };

    fetchPayments();
  }, [selectedDate]);

  const renderRow = ({ item, index }) => {
    const rowStyle = index % 2 === 0 ? styles.rowEven : styles.rowOdd;
    return (
      <View style={[styles.row, rowStyle]}>
        <Text style={styles.rowData}>{item.referencia}</Text>
        <Text style={styles.rowData}>{item.telefono}</Text>
        <Text style={styles.rowData}>{item.monto}</Text>
      </View>
    );
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pagos del día {selectedDate}</Text>
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableTitle}>Referencia</Text>
          <Text style={styles.tableTitle}>Nro. Celular</Text>
          <Text style={styles.tableTitle}>Monto (Bs)</Text>
        </View>
        <FlatList
          data={payments}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderRow}
        />
      </View>
      <TouchableOpacity style={styles.backButton} onPress={goBack}>
        <Text style={styles.backButtonText}>Regresar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
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
  table: {
    backgroundColor: '#F0F0F0',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
    paddingVertical: 10,
    backgroundColor: '#8280A3',
  },
  tableTitle: {
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    color: 'white',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
    paddingVertical: 10,
  },
  rowEven: {
    backgroundColor: '#C4C3CF',
  },
  rowOdd: {
    backgroundColor: 'white',
  },
  rowData: {
    flex: 1,
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: '#363062',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  backButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Payments;
