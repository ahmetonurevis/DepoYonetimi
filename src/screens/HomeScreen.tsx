import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, Animated, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { Icon } from 'react-native-elements';
import { styles } from '../css/homecss';

const { width: screenWidth } = Dimensions.get('window');

interface Product {
  id: string;
  name: string;
  stock: number;
  createdAt: firebase.firestore.Timestamp | null;
}

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [products, setProducts] = useState<Product[]>([]);
  const [latestProducts, setLatestProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [lowStockProducts, setLowStockProducts] = useState<number>(0);
  const [zeroStockProducts, setZeroStockProducts] = useState<number>(0);

  const cardWidth = screenWidth * 0.75;
  const cardSpacing = 18;
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const unsubscribeAllProducts = firestore()
      .collection('Products')
      .onSnapshot(snapshot => {
        if (snapshot && !snapshot.empty) {
          const productList: Product[] = [];
          let total = 0;
          let lowStock = 0;
          let zeroStock = 0;

          snapshot.forEach(doc => {
            const { productName, productStock, createdAt } = doc.data();
            productList.push({
              id: doc.id,
              name: productName,
              stock: productStock,
              createdAt: createdAt || null,
            });

            total += 1;
            if (productStock < 10 && productStock > 0) lowStock += 1;
            if (productStock === 0) zeroStock += 1;
          });

          setProducts(productList);
          setTotalProducts(total);
          setLowStockProducts(lowStock);
          setZeroStockProducts(zeroStock);
          setLoading(false);
        } else {
          console.log('Ürün Bulunamadı');
          setLoading(false);
        }
      }, error => {
        console.error("Ürünler Getirilirken Hata Oluştu.!! ", error);
      });

    const unsubscribeLatestProducts = firestore()
      .collection('Products')
      .orderBy('createdAt', 'desc')
      .limit(3)
      .onSnapshot(snapshot => {
        if (snapshot && !snapshot.empty) {
          const latestProductList: Product[] = [];
          snapshot.forEach(doc => {
            const { productName, productStock, createdAt } = doc.data();
            latestProductList.push({
              id: doc.id,
              name: productName,
              stock: productStock,
              createdAt: createdAt || null,
            });
          });
          setLatestProducts(latestProductList);
        } else {
          console.log('Son Ürünler Bulunamadı!!!');
        }
      });

    return () => {
      unsubscribeAllProducts();
      unsubscribeLatestProducts();
    };
  }, []);

  const summaryCards = [
    { title: 'Toplam Ürünler', value: totalProducts, backgroundColor: '#4A90E2', icon: 'inventory' },
    { title: 'Düşük Stokta Olanlar', value: lowStockProducts, backgroundColor: '#F5A623', icon: 'warning' },
    { title: 'Stokta Olmayanlar', value: zeroStockProducts, backgroundColor: '#E94E77', icon: 'do-not-disturb' },
    { title: 'Yeni Eklenenler', value: latestProducts.length, backgroundColor: '#FF7F00', icon: 'fiber-new' },
  ];

  return (
    <KeyboardAvoidingView>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <View style={styles.summaryContainer}>
            <View style={styles.row}>
              {summaryCards.slice(0, 2).map((card, index) => (
                <View key={index} style={[styles.card, { backgroundColor: card.backgroundColor }]}>
                  <Icon name={card.icon} size={35} color="#fff" />
                  <Text style={styles.cardTitle}>{card.title}</Text>
                  <Text style={styles.cardValue}>{card.value}</Text>
                </View>
              ))}
            </View>
            <View style={styles.row}>
              {summaryCards.slice(2, 4).map((card, index) => (
                <View key={index} style={[styles.card, { backgroundColor: card.backgroundColor }]}>
                  <Icon name={card.icon} size={35} color="#fff" />
                  <Text style={styles.cardTitle}>{card.title}</Text>
                  <Text style={styles.cardValue}>{card.value}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.quickActions}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('AddProductScreen')}
            >
              <Icon name="add-circle-outline" size={20} color="#fff" />
              <Text style={styles.buttonText}>Ürün Ekle</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('ProductListScreen')}
            >
              <Icon name="list-alt" size={20} color="#fff" />
              <Text style={styles.buttonText}>Ürün Listesi</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>Son Eklenen Ürünler</Text>

          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#4A90E2" />
              <Text>Yükleniyor...</Text>
            </View>
          ) : (
            <FlatList
              data={latestProducts}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.productCard}>
                  <View style={styles.productInfo}>
                    <Icon name="fiber-new" size={20} color="#4A90E2" style={styles.productIcon} />
                    <Text style={styles.productName}>{item.name}</Text>
                  </View>
                  <View style={styles.productDetails}>
                    <Text style={[styles.productStock, item.stock > 0 ? styles.inStock : styles.outOfStock]}>
                      {item.stock > 0 ? `Stok: ${item.stock}` : 'Stokta Yok!'}
                    </Text>
                  </View>
                </View>
              )}
              contentContainerStyle={{ paddingBottom: 120 }}
            />
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};



export default HomeScreen;
