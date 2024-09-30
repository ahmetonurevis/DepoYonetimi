import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator, ScrollView } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import firestore from '@react-native-firebase/firestore';

const { width } = Dimensions.get('window');

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
    
    const unsubscribe = firestore()
      .collection('Products')
      .onSnapshot(snapshot => {
        const productList: Product[] = [];
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
        setLoading(false);
      }, error => {
        console.error("Error fetching products: ", error);
      });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text>Yükleniyor...</Text>
      </View>
    );
  }


  const pieData = products.map((product) => ({
    name: product.name,
    population: product.stock,
    color: getRandomColor(),
    legendFontColor: '#333',
    legendFontSize: 12,
    
  }));

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Ürün Stokları</Text>

      <View style={styles.cardRow}>
        <View style={styles.statCard}>
          <Text style={styles.statTitle}>Toplam Ürün</Text>
          <Text style={styles.statValue}>{products.length}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statTitle}>Toplam Stok</Text>
          <Text style={styles.statValue}>
            {products.reduce((total, product) => total + product.stock, 0)}
          </Text>
        </View>
      </View>

     
      <Text style={styles.chartTitle}>Departman Satışları</Text>
      <PieChart
        data={pieData}
        width={width - 40} 
        height={250}
        chartConfig={chartConfig}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
    </ScrollView>
  );
};

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const chartConfig = {
  backgroundColor: '#ffffff',
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#ffa726',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    width: width * 0.4,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  statTitle: {
    fontSize: 16,
    color: '#888',
    marginBottom: 10,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DashboardScreen;
