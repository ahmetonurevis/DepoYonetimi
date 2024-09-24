import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import LinearGradient from 'react-native-linear-gradient'; 
import { Icon } from 'react-native-elements'; 

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

      <View style={styles.inputContainer}>
        <Icon name="box" type="feather" color="#007bff" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Ürün Adı"
          value={productName}
          onChangeText={setProductName}
          placeholderTextColor="#aaa"
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="layers" type="feather" color="#007bff" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Stok Miktarı"
          value={productStock}
          onChangeText={setProductStock}
          keyboardType="numeric"
          placeholderTextColor="#aaa"
        />
      </View>

      <TouchableOpacity onPress={handleAddProduct}>
        <LinearGradient
          colors={['#6dd5ed', '#2193b0']} 
          style={styles.button}
        >
          <Text style={styles.buttonText}>Kaydet</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16, 
    backgroundColor: '#f0f4f8',
  },
  title: {
    fontSize: 26, 
    fontWeight: 'bold',
    marginBottom: 16, 
    textAlign: 'center',
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12, 
    marginBottom: 12, 
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingLeft: 8, 
  },
  icon: {
    marginRight: 8, 
  },
  button: {
    paddingVertical: 12, 
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16, 
    fontWeight: 'bold',
  },
});

export default AddProductScreen;
