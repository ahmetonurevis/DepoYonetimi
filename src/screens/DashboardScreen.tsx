import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import firestore from '@react-native-firebase/firestore';

const { width, height } = Dimensions.get('window');

interface Product {
  id: string;
  name: string;
  stock: number;
  price: number;
  description: string;
}

const DashboardScreen = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productList: Product[] = [];
        const snapshot = await firestore().collection('Products').get();
        snapshot.forEach(doc => {
          const { productName, productStock, productPrice, productDescription } = doc.data();
          productList.push({
            id: doc.id,
            name: productName,
            stock: productStock,
            price: productPrice,
            description: productDescription,
          });
        });
        setProducts(productList);
      } catch (error) {
        console.error("Error fetching products: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text>Yükleniyor...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>

      <View style={styles.row}>
        {products.map((product, index) => (
          <TouchableOpacity key={index} style={styles.card}>
            <Icon name="inventory" size={40} color="#fff" />
            <Text style={styles.cardTitle}>{product.name}</Text>
            <Text style={styles.cardValue}>{product.stock > 0 ? `${product.stock} adet` : 'Stok Yok'}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  card: {
    width: width * 0.42,
    height: width * 0.42,
    backgroundColor: '#4caf50',
    borderRadius: width * 0.21, 
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 16,
    color: '#fff',
    marginTop: 10,
    textAlign: 'center',
  },
  cardValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 5,
    textAlign: 'center',
  },
  bottomButtonContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  bottomButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4caf50',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    justifyContent: 'center',
  },
  bottomButtonText: {
    fontSize: 18,
    color: '#fff',
    marginLeft: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DashboardScreen;
