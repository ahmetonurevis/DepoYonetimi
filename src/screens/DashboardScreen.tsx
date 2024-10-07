import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import firestore from '@react-native-firebase/firestore';
import { styles, chartConfig, getRandomColor } from '../css/dashboardcss';

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

export default DashboardScreen;
