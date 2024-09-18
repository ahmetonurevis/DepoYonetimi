import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

interface Product {
  id: number;
  name: string;
  stock: number;
}

const ProductListScreen: React.FC = () => {
 
  const products: Product[] = [
    { id: 4, name: 'Ürün 1', stock: 5 },
    { id: 5, name: 'Ürün 2', stock: 0 },
    { id: 6, name: 'Ürün 3', stock: 15 },
    { id: 7, name: 'Ürün 4', stock: 3 },
    { id: 8, name: 'Ürün 5', stock: 321 },
    { id: 9, name: 'Ürün 6', stock: 0 },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ürün Listesi</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productStock}>
              Stok: {item.stock > 0 ? item.stock : 'Stokta Yok'}
            </Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 100 }} // Buraya paddingBottom ekledik
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  productItem: {
    padding: 16,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    marginBottom: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productStock: {
    fontSize: 16,
    color: '#666',
  },
});

export default ProductListScreen;
