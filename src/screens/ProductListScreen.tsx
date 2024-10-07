import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Modal, TextInput, Button, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux';
import { addStockIncrease, addStockDecrease } from '../redux/stockSlice';
import { Picker } from '@react-native-picker/picker';
import { styles } from '../css/productlistcss';

interface Product {
  id: string;
  name: string;
  stock: number;
  purchasePrice: number;
  salePrice: number;
  description: string;
  category: string;
}

const ProductListScreen: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<string[]>(['Tümü']);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [detailModalVisible, setDetailModalVisible] = useState<boolean>(false);
  const [newStock, setNewStock] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Tümü');
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = firestore().collection('Category').onSnapshot(snapshot => {
      const categoryList: string[] = ['Tümü'];
      snapshot.forEach(doc => {
        const { category } = doc.data();
        categoryList.push(category);
      });
      setCategories(categoryList);
    }, error => {
      console.error('Error fetching categories:', error);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      let collectionRef = firestore().collection('Products');
      let query;
  
      if (selectedCategory === 'Tümü') {
        query = collectionRef;
      } else {
        query = collectionRef.where('category', '==', selectedCategory);
      }
  
      const unsubscribe = query.onSnapshot(snapshot => {
        const productList: Product[] = [];
        snapshot.forEach(doc => {
          const { productName, productStock, productPurchasePrice, productSalePrice, productDescription, category } = doc.data();
          productList.push({
            id: doc.id,
            name: productName,
            stock: productStock,
            purchasePrice: productPurchasePrice,
            salePrice: productSalePrice,
            description: productDescription,
            category: category,
          });
        });
        setProducts(productList);
        setLoading(false);
      });
  
      return () => unsubscribe();
    };
  
    fetchProducts();
  }, [selectedCategory]);

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
      let totalAmount = 0;

      if (action === 'add') {
        updatedStock += stockNumber;
        totalAmount = stockNumber * selectedProduct.purchasePrice;

        dispatch(addStockIncrease({ productId: selectedProduct.id, changeAmount: stockNumber, timestamp: Date.now() }));

        await firestore().collection('StockIncreases').add({
          productId: selectedProduct.id,
          changeAmount: stockNumber,
          timestamp: firestore.FieldValue.serverTimestamp(),
          purchasePrice: selectedProduct.purchasePrice,
          totalAmount: totalAmount,
        });

      } else if (action === 'subtract') {
        if (selectedProduct.stock - stockNumber < 0) {
          Alert.alert('Hata', 'Stok miktarı sıfırdan az olamaz.');
          return;
        }

        updatedStock -= stockNumber;
        totalAmount = stockNumber * selectedProduct.salePrice;

        dispatch(addStockDecrease({ productId: selectedProduct.id, changeAmount: stockNumber, timestamp: Date.now() }));

        await firestore().collection('StockDecreases').add({
          productId: selectedProduct.id,
          changeAmount: stockNumber,
          timestamp: firestore.FieldValue.serverTimestamp(),
          salePrice: selectedProduct.salePrice,
          totalAmount: totalAmount,
        });
      }

      await firestore().collection('Products').doc(selectedProduct.id).update({
        productStock: updatedStock,
      });

      setModalVisible(false);
      setSelectedProduct(null);
      setNewStock('');

      Alert.alert('Başarılı', `Stok miktarı ${action === 'add' ? 'artırıldı' : 'azaltıldı'}.`);
    } catch (error) {
      console.error('Error updating stock:', error);
      Alert.alert('Hata', 'Stok güncellenirken bir hata oluştu.');
    }
  };

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setNewStock('');
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
      <Picker
        selectedValue={selectedCategory}
        onValueChange={(itemValue) => setSelectedCategory(itemValue)}
        style={{ height: 50, width: '100%' }}
      >
        {categories.map(category => (
          <Picker.Item key={category} label={category} value={category} />
        ))}
      </Picker>

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
      )}

      {selectedProduct && (
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
              <Text style={styles.modalText}>Stok: {selectedProduct.stock} adet</Text>
              <Text style={styles.modalText}>Alış Fiyatı: {selectedProduct.purchasePrice} ₺</Text>
              <Text style={styles.modalText}>Satış Fiyatı: {selectedProduct.salePrice} ₺</Text>
              <Text style={styles.modalText}>Kategori: {selectedProduct.category}</Text>
              <Text style={styles.modalText}>Açıklama: {selectedProduct.description}</Text>
              <Button title="Kapat" onPress={() => setDetailModalVisible(false)} />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default ProductListScreen;
