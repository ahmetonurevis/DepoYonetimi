import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const AddProductScreen: React.FC = () => {
  const [productName, setProductName] = useState<string>('');
  const [productStock, setProductStock] = useState<string>('');

  const handleAddProduct = async () => {
    if (!productName || !productStock) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurunuz.');
      return;
    }

    const stockNumber = parseInt(productStock, 10);
    if (isNaN(stockNumber)) {
      Alert.alert('Hata', 'Stok miktarı sayısal bir değer olmalıdır.');
      return;
    }

    try {
      
      await firestore().collection('Products').add({
        productName,
        productStock: stockNumber,
        createdAt: firestore.FieldValue.serverTimestamp(), 
      });

      Alert.alert('Başarılı', `Ürün eklendi: ${productName}, Stok: ${stockNumber}`);
      setProductName('');
      setProductStock('');
    } catch (error) {
      Alert.alert('Hata', 'Ürün eklenirken bir hata oluştu.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Yeni Ürün Ekle</Text>

      <TextInput
        style={styles.input}
        placeholder="Ürün Adı"
        value={productName}
        onChangeText={setProductName}
      />

      <TextInput
        style={styles.input}
        placeholder="Stok Miktarı"
        value={productStock}
        onChangeText={setProductStock}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={handleAddProduct}>
        <Text style={styles.buttonText}>Kaydet</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default AddProductScreen;
