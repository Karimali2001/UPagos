import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import moment from 'moment';

const Payments = ({ route, navigation }) => {
  const data = route.params.data;
  let selectedDate = moment(data);
  selectedDate = selectedDate.format('DD/MM/YYYY');

  // Sample payment data for demonstration
  const payments = [
    { ref: 'Ref 1', phoneNumber: '123-456-7890', amount: 50 },
    { ref: 'Ref 2', phoneNumber: '987-654-3210', amount: 75 },
    { ref: 'Ref 3', phoneNumber: '111-222-3333', amount: 100 },
    // ... other payment data
  ];

  const renderRow = ({ item, index }) => {
    const rowStyle = index % 2 === 0 ? styles.rowEven : styles.rowOdd;
    return (
      <View style={[styles.row, rowStyle]}>
        <Text style={styles.rowData}>{item.ref}</Text>
        <Text style={styles.rowData}>{item.phoneNumber}</Text>
        <Text style={styles.rowData}>{item.amount}</Text>
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
    backgroundColor: '#FFF',
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
