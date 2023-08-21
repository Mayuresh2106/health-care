// screens/MedicalRecordsScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MedicalRecordsScreen = () => {
  const [medicalRecords, setMedicalRecords] = useState([]);

  useEffect(() => {
    fetchMedicalRecords();
  }, []);

  const fetchMedicalRecords = async () => {
    try {
      const storedRecords = await AsyncStorage.getItem('medicalRecords');
      if (storedRecords) {
        const records = JSON.parse(storedRecords);
        setMedicalRecords(records);
      }
    } catch (error) {
      console.error('Error fetching medical records:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Medical Records</Text>
      {medicalRecords.map((record, index) => (
        <View key={index} style={styles.recordContainer}>
          <Text>{record.date}</Text>
          <Text>{record.description}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  recordContainer: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 10,
  },
});

export default MedicalRecordsScreen;
