import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Modal, TextInput, Button, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';

interface Product {
  id: string;
  name: string;
  stock: number;
}

const ProductListScreen: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [newStock, setNewStock] = useState<string>('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productList: Product[] = [];
        const snapshot = await firestore().collection('Products').get();
        snapshot.forEach(doc => {
          const { productName, productStock } = doc.data();
          productList.push({
            id: doc.id,
            name: productName,
            stock: productStock,
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

  // Stok güncelleme işlemi
  const handleUpdateStock = async () => {
    if (!selectedProduct || newStock === '') {
      Alert.alert('Hata', 'Lütfen geçerli bir stok miktarı giriniz.');
      return;
    }

    try {
      const stockNumber = parseInt(newStock, 10);
      if (isNaN(stockNumber)) {
        Alert.alert('Hata', 'Stok miktarı sayısal bir değer olmalıdır.');
        return;
      }

      await firestore().collection('Products').doc(selectedProduct.id).update({
        productStock: stockNumber
      });

      // Güncellenen ürünün state'e eklenmesi
      setProducts(prevProducts => prevProducts.map(product =>
        product.id === selectedProduct.id ? { ...product, stock: stockNumber } : product
      ));

      setModalVisible(false);
      setSelectedProduct(null);
      setNewStock('');
      Alert.alert('Başarılı', 'Stok miktarı güncellendi.');
    } catch (error) {
      Alert.alert('Hata', 'Stok güncellenirken bir hata oluştu.');
    }
  };

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setNewStock(product.stock.toString());
    setModalVisible(true);
  };

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
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productStock}>
              Stok: {item.stock > 0 ? item.stock : 'Stokta Yok'}
            </Text>
            <TouchableOpacity style={styles.editButton} onPress={() => openModal(item)}>
              <Text style={styles.editButtonText}>Düzenle</Text>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 100 }} 
      />

      
      {selectedProduct && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Stok Düzenle</Text>
              <Text>Ürün: {selectedProduct.name}</Text>
              <TextInput
                style={styles.input}
                placeholder="Yeni stok miktarı"
                value={newStock}
                onChangeText={setNewStock}
                keyboardType="numeric"
              />
              <Button title="Güncelle" onPress={handleUpdateStock} />
              <Button title="İptal" color="red" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </Modal>
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
  productItem: {
    padding: 16,
    backgroundColor: '#000000',
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productStock: {
    fontSize: 16,
    color: '#666',
  },
  editButton: {
    backgroundColor: '#007bff',
    padding: 8,
    borderRadius: 5,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    width: '100%',
    marginBottom: 16,
  },
});

export default ProductListScreen;
