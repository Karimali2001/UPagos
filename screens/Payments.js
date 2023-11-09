import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Date } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';


const Payments = ({route}) => {
  const data = route.params.data;
  let selectedDate = moment(data);
  selectedDate = selectedDate.format('DD/MM/YYYY');
  const navigation = useNavigation();


  const samplePayments = [
    { id: 1, amount: 100, description: 'Payment for item A' },
    { id: 2, amount: 50, description: 'Payment for item B' },
    { id: 3, amount: 200, description: 'Payment for item C' },
  ];

  const payments = samplePayments;
  const handleBackPress = () => {
    navigation.goBack();
  };

  const renderPaymentItem = ({ item }) => {
    return (
      <View style={styles.paymentItem}>
        <Text style={styles.paymentAmount}>{item.amount}</Text>
        <Text style={styles.paymentDescription}>{item.description}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pagos del {selectedDate}</Text>
      </View>

      <FlatList
        data={payments}
        renderItem={renderPaymentItem}
        keyExtractor={item => item.id}
        style={styles.paymentsList}
      />
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 20,
  },
  headerTitle: {
    color: '#F99417',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  paymentsList: {
    width: '100%',
    flex: 1,
  },
  paymentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  paymentAmount: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  paymentDescription: {
    fontSize: 16,
  },
});

export default Payments;
