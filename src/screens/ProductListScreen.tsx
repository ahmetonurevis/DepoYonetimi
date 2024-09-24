import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Modal, TextInput, Button, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Product {
  id: string;
  name: string;
  stock: number;
  price: number;
  description: string;
}

const ProductListScreen: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [detailModalVisible, setDetailModalVisible] = useState<boolean>(false);
  const [newStock, setNewStock] = useState<string>('');

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

  const openDetailModal = (product: Product) => {
    setSelectedProduct(product);
    setDetailModalVisible(true);
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
          <TouchableOpacity onPress={() => openDetailModal(item)}>
            <View style={[styles.productItem, item.stock === 0 ? styles.outOfStock : styles.inStock]}>
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{item.name}</Text>
                <View style={styles.stockInfo}>
                  <Icon
                    name={item.stock === 0 ? "error-outline" : "check-circle-outline"}
                    size={20}
                    color={item.stock === 0 ? "#dc3545" : "#28a745"}
                  />
                  <Text style={[styles.productStock, { color: item.stock === 0 ? "#dc3545" : "#28a745" }]}>
                    {item.stock > 0 ? `${item.stock} adet` : 'Stokta Yok'}
                  </Text>
                </View>
              </View>
              <TouchableOpacity style={styles.editButton} onPress={() => openModal(item)}>
                <Text style={styles.editButtonText}>Düzenle</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {selectedProduct && (
        <>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Stok Düzenle</Text>
                <Text style={styles.modalProductName}>{selectedProduct.name}</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Yeni stok miktarı"
                  value={newStock}
                  onChangeText={setNewStock}
                  keyboardType="numeric"
                />
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={[styles.modalButton, styles.updateButton]} onPress={handleUpdateStock}>
                    <Text style={styles.modalButtonText}>Güncelle</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setModalVisible(false)}>
                    <Text style={styles.modalButtonText}>İptal</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          <Modal
            animationType="slide"
            transparent={true}
            visible={detailModalVisible}
            onRequestClose={() => setDetailModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Ürün Detayları</Text>
                <Text style={styles.modalProductName}>{selectedProduct.name}</Text>
                <Text>Stok: {selectedProduct.stock} adet</Text>
                <Text>Fiyat: {selectedProduct.price} ₺</Text>
                <Text>Açıklama: {selectedProduct.description}</Text>
                <Button title="Kapat" onPress={() => setDetailModalVisible(false)} />
              </View>
            </View>
          </Modal>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f4f8',
  },
  productItem: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 15,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 4,
  },
  inStock: {
    borderLeftColor: '#28a745',
    borderLeftWidth: 6,
  },
  outOfStock: {
    borderLeftColor: '#dc3545',
    borderLeftWidth: 6,
  },
  productInfo: {
    flexDirection: 'column',
  },
  stockInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  productStock: {
    fontSize: 16,
    marginLeft: 6,
    fontWeight: '600',
  },
  editButton: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    elevation: 2,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
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
    borderRadius: 15,
    alignItems: 'center',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  modalProductName: {
    fontSize: 18,
    marginBottom: 10,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    width: '100%',
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  updateButton: {
    backgroundColor: '#28a745',
  },
  cancelButton: {
    backgroundColor: '#dc3545',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default ProductListScreen;
