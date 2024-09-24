
import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';

const Dashboard = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <Text style={styles.header}>Dashboard</Text>

      {/* Info Cards */}
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Toplam Stok</Text>
          <Text style={styles.cardValue}>1234</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Kritik Stoklar</Text>
          <Text style={styles.cardValue}>5 Ürün</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Son Eklenen Ürünler</Text>
          <Text style={styles.cardValue}>Ürün A, Ürün B</Text>
        </View>
      </View>

      {/* Functional Buttons */}
      <View style={styles.buttonContainer}>
        <Button title="Yeni Ürün Ekle" onPress={() => {}} />
        <Button title="Stok Güncelle" onPress={() => {}} />
      </View>

      {/* Placeholder for Graphs */}
      <View style={styles.graphContainer}>
        <Text style={styles.graphText}>Stok Seviyeleri Grafiği</Text>
        {/* Buraya grafikler eklenecek */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    width: '30%',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardValue: {
    fontSize: 20,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  graphContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
  },
  graphText: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
});

export default Dashboard;
