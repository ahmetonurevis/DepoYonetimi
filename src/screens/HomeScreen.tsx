import React from 'react';
import { Avatar, Card, IconButton } from 'react-native-paper';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';

interface Product {
  id: number;
  name: string;
  stock: number;
}

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  // Ürünler dizisi
  const products: Product[] = [
    { id: 1, name: 'Ürün 1', stock: 5 },
    { id: 2, name: 'Ürün 2', stock: 0 },
    { id: 3, name: 'Ürün 3', stock: 15 },
  ];

  // Düşük stok ve sıfır stok ürün sayıları
  const lowStockProducts = products.filter(product => product.stock < 10 && product.stock > 0).length;
  const zeroStockProducts = products.filter(product => product.stock == 0).length;

  return (
    <View style={styles.container}>
      {/* Ürün Özeti */}
      <View style={styles.summaryContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Toplam Ürünler</Text>
          <Text style={styles.cardValue}>{products.length}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Düşük Stokta Olanlar</Text>
          <Text style={styles.cardValue}>{lowStockProducts}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Stokta Olmayanlar</Text>
          <Text style={styles.cardValue}>{zeroStockProducts}</Text>
        </View>
      </View>

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

      {/* Son Eklenen Ürünler */}
      <Text style={styles.sectionTitle}>Son Eklenen Ürünler</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={styles.productItem}>
            <Card.Title
              title={item.name}
              subtitle={`Stok: ${item.stock > 0 ? item.stock : 'Stokta Yok!'}`}
              left={(props) => <Avatar.Icon {...props} icon="folder" />}  
              right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => { }} />}  
            />
          </Card>
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
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cardTitle: {
    fontSize: 16,
    color: '#6c757d',
    marginBottom: 8,
  },
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
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
    borderRadius: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});

export default HomeScreen;
