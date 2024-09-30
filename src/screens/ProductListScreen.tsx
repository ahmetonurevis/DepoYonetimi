import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Modal, TextInput, Button, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {styles}  from '../styles/productlistcss';

interface Product {
  id: string;
  name: string;
  stock: number;
  purchasePrice: number;
  salePrice: number;
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
          const { productName, productStock, productPurchasePrice, productSalePrice, productDescription } = doc.data();
          productList.push({
            id: doc.id,
            name: productName,
            stock: productStock,
            purchasePrice: productPurchasePrice,
            salePrice: productSalePrice,
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

  const handleUpdateStock = async (action: 'add' | 'subtract') => {
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

      let updatedStock = selectedProduct.stock;

      if (action === 'add') {
        updatedStock += stockNumber;
      } else if (action === 'subtract') {
        if (selectedProduct.stock - stockNumber < 0) {
          Alert.alert('Hata', 'Stok miktarı sıfırdan az olamaz.');
          return;
        }
        updatedStock -= stockNumber;
      }

      await firestore().collection('Products').doc(selectedProduct.id).update({
        productStock: updatedStock,
      });

      setProducts(prevProducts => prevProducts.map(product =>
        product.id === selectedProduct.id ? { ...product, stock: updatedStock } : product
      ));

      setModalVisible(false);
      setSelectedProduct(null);
      setNewStock('');
      Alert.alert('Başarılı', `Stok miktarı ${action === 'add' ? 'artırıldı' : 'azaltıldı'}.`);
    } catch (error) {
      Alert.alert('Hata', 'Stok güncellenirken bir hata oluştu.');
    }
  };

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setNewStock(''); // Yeni stok değeri sıfırlanır
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
                <Text style={styles.editButtonText}>Stok Düzenle</Text>
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
                  <TouchableOpacity style={[styles.modalButton, styles.updateButton]} onPress={() => handleUpdateStock('add')}>
                    <Text style={styles.modalButtonText}>Stok Ekle</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.modalButton, styles.subtractButton]} onPress={() => handleUpdateStock('subtract')}>
                    <Text style={styles.modalButtonText}>Stok Düş</Text>
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
                <Text>Alış Fiyatı: {selectedProduct.purchasePrice} ₺</Text>
                <Text>Satış Fiyatı: {selectedProduct.salePrice} ₺</Text>
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


export default ProductListScreen;
