import React, { useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, Dimensions, Animated } from 'react-native';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';

const { width: screenWidth } = Dimensions.get('window');

interface Product {
  id: number;
  name: string;
  stock: number;
}

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  
  const products: Product[] = [
    { id: 1, name: 'Ürün 1', stock: 5 },
    { id: 2, name: 'Ürün 2', stock: 0 },
    { id: 3, name: 'Ürün 3', stock: 15 },
  ];

  const lowStockProducts = products.filter(product => product.stock < 10 && product.stock > 0).length;
  const zeroStockProducts = products.filter(product => product.stock == 0).length;

  const summaryCards = [
    { title: 'Toplam Ürünler', value: products.length, backgroundColor: '#007bff' },  
    { title: 'Düşük Stokta Olanlar', value: lowStockProducts, backgroundColor: '#ffc107' },  
    { title: 'Stokta Olmayanlar', value: zeroStockProducts, backgroundColor: '#dc3545' },  
  ];

  const cardWidth = screenWidth * 0.85;  
  const cardSpacing = 18;  

  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      
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
            outputRange: [0.9, 1, 0.9], // Ortadaki kart büyük olur
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={index}
              style={[
                styles.card,
                { backgroundColor: card.backgroundColor, width: cardWidth, transform: [{ scale }] },
              ]}
            >
              <Text style={styles.cardTitle}>{card.title}</Text>
              <Text style={styles.cardValue}>{card.value}</Text>

              
              {/* <Image source={require('./path-to-your-image.jpg')} style={styles.cardImage} /> */}
            </Animated.View>
          );
        })}
      </Animated.ScrollView>

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
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <Text>{item.name}</Text>
            <Text>{item.stock > 0 ? `Stok: ${item.stock}` : 'Stokta Yok!'}</Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 120 }}
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
  summaryContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  card: {
    height: 130,
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
  cardImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
  },
});

export default HomeScreen;
