import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, Animated, ActivityIndicator } from 'react-native';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

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

  // Stok verileri
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
          console.log('No products found');
          setLoading(false);
        }
      }, error => {
        console.error("Error fetching products: ", error);
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
              createdAt: createdAt || null,  // Zaman damgasını al
            });
          });
          setLatestProducts(latestProductList);
        } else {
          console.log('No latest products found');
        }
      });

    return () => {
      unsubscribeAllProducts();
      unsubscribeLatestProducts();
    };
  }, []);

  const summaryCards = [
    { title: 'Toplam Ürünler', value: totalProducts, backgroundColor: '#007bff' },
    { title: 'Düşük Stokta Olanlar', value: lowStockProducts, backgroundColor: '#ffc107' },
    { title: 'Stokta Olmayanlar', value: zeroStockProducts, backgroundColor: '#dc3545' },
  ];

  return (
    <View style={styles.container}>
      {/* Stok Bilgisi Kartları */}
      <Animated.ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.summaryContainer}
        snapToInterval={cardWidth + cardSpacing}
        decelerationRate="fast"
        scrollEventThrottle={16}
        pagingEnabled
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
      >
        {summaryCards.map((card, index) => {
          const inputRange = [
            (index - 1) * (cardWidth + cardSpacing),
            index * (cardWidth + cardSpacing),
            (index + 1) * (cardWidth + cardSpacing),
          ];

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.9, 1, 0.9],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={index}
              style={[styles.card, { backgroundColor: card.backgroundColor, width: cardWidth, transform: [{ scale }] }]}>
              <Text style={styles.cardTitle}>{card.title}</Text>
              <Text style={styles.cardValue}>{card.value}</Text>
            </Animated.View>
          );
        })}
      </Animated.ScrollView>

      {/* Hızlı Eylemler */}
      <View style={styles.quickActions}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AddProductScreen')}
        >
          <Text style={styles.buttonText}>Ürün Ekle</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ProductListScreen')}
        >
          <Text style={styles.buttonText}>Ürün Listesi</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Son Eklenen Ürünler</Text>

      {/* Son Eklenen Ürünler Listesi */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007bff" />
          <Text>Yükleniyor...</Text>
        </View>
      ) : (
        <FlatList
          data={latestProducts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.productItem}>
              <Text>{item.name}</Text>
              <Text>{item.stock > 0 ? `Stok: ${item.stock}` : 'Stokta Yok!'}</Text>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 120 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  summaryContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  card: {
    height: 130,
    width: screenWidth * 0.75,
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 10,
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 16,
    color: '#000000',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000'
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  productItem: {
    marginVertical: 8,
    marginHorizontal: 5,
    padding: 20,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
