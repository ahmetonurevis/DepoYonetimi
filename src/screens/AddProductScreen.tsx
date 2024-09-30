import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from 'react-native-elements';
import { styles } from '../styles/addproductcss';

const AddProductScreen: React.FC = () => {
  const [productName, setProductName] = useState<string>('');
  const [productStock, setProductStock] = useState<string>('');
  const [productPurchasePrice, setProductPurchasePrice] = useState<string>('');
  const [productSalePrice, setProductSalePrice] = useState<string>('');
  const [productDescription, setProductDescription] = useState<string>('');

  const handleAddProduct = async () => {
    if (!productName || !productStock || !productPurchasePrice || !productSalePrice) {
      Alert.alert('Hata', 'Lütfen gerekli tüm alanları doldurunuz.');
      return;
    }

    const stockNumber = parseInt(productStock, 10);
    const purchasePriceNumber = parseFloat(productPurchasePrice);
    const salePriceNumber = parseFloat(productSalePrice);

    if (isNaN(stockNumber) || isNaN(purchasePriceNumber) || isNaN(salePriceNumber)) {
      Alert.alert('Hata', 'Lütfen geçerli sayısal değerler giriniz.');
      return;
    }

    try {
      await firestore().collection('Products').add({
        productName,
        productStock: stockNumber,
        productPurchasePrice: purchasePriceNumber,
        productSalePrice: salePriceNumber,
        productDescription,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      Alert.alert('Başarılı', `Ürün eklendi: ${productName}`);
      setProductName('');
      setProductStock('');
      setProductPurchasePrice('');
      setProductSalePrice('');
      setProductDescription('');
    } catch (error) {
      Alert.alert('Hata', 'Ürün eklenirken bir hata oluştu.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
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

        <View style={styles.inputContainer}>
          <Icon name="dollar-sign" type="feather" color="#007bff" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Alış Fiyatı"
            value={productPurchasePrice}
            onChangeText={setProductPurchasePrice}
            keyboardType="numeric"
            placeholderTextColor="#aaa"
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="tag" type="feather" color="#007bff" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Satış Fiyatı"
            value={productSalePrice}
            onChangeText={setProductSalePrice}
            keyboardType="numeric"
            placeholderTextColor="#aaa"
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="file-text" type="feather" color="#007bff" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Ürün Açıklaması"
            value={productDescription}
            onChangeText={setProductDescription}
            multiline
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
};



export default AddProductScreen;
