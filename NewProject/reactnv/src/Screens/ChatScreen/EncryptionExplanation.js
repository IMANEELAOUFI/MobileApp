import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const EncryptionExplanation = ({ onClose }) => {
  return (
    <View style={styles.encryptionExplanationContainer}>
      <Text style={styles.explanationTitle}>End-to-End Encryption</Text>
      <Text style={styles.explanationText}>
        End-to-end encryption ensures that only the sender and recipient can read the messages.
      </Text>
      <Button title="Close" onPress={onClose} />
    </View>
  );
};

const styles = StyleSheet.create({
  encryptionExplanationContainer: {
    backgroundColor: 'white',  // You can style this container as needed
    padding: 20,
    margin: 10,
    borderRadius: 10,
    elevation: 5,
  },
  explanationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  explanationText: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default EncryptionExplanation;
