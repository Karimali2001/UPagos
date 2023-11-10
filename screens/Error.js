//pagina donde se muestra un error dado
// Error.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Error = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>Oops! Something went wrong.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF6347', // Example background color (tomato)
  },
  errorText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Error;
