import React, { useState } from 'react';
import { Modal, Button, View, Text, ScrollView, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {styles}  from '../styles/profilecss'; 

const ProfileScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handleCardNumberChange = (text: string) => {
    let formattedText = text.replace(/\D/g, '');
    if (formattedText.length > 0) {
      formattedText = formattedText.match(/.{1,4}/g).join(' ');
    }
    setCardNumber(formattedText.slice(0, 19));
  };

  const handleExpiryDateChange = (text: string) => {
    let formattedText = text.replace(/\D/g, '');
    let month = formattedText.slice(0, 2);
    if (parseInt(month) > 12) {
      month = '12';
    }
    if (formattedText.length > 2) {
      formattedText = `${month}/${formattedText.slice(2, 4)}`;
    }
    setExpiryDate(formattedText);
  };

  const handleCvvChange = (text: string) => {
    const formattedText = text.replace(/\D/g, '');
    setCvv(formattedText.slice(0, 3));
  };

  const handleCancel = () => {
    setCardNumber('');
    setExpiryDate('');
    setCvv('');
    setModalVisible(false);
  };

  return (
    <View style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.profileDetails}>
            <Text style={styles.profileText}>Profilim</Text>
            <Text style={styles.userName}>Ahmet Onur Evis</Text>
            <Text style={styles.userPhone}>(546) 563-8606</Text>
            <Text style={styles.userEmail}>evis4798@gmail.com</Text>
          </View>
          <View style={styles.avatarContainer}>
            <Image style={styles.avatar} source={{ uri: 'https://randomuser.me/api/portraits/men/45.jpg' }} />
          </View>
        </View>

        <View style={styles.balanceCard}>
          <View style={styles.cardRow}>
            <Text style={styles.balanceText}>Bakiye</Text>
            <Icon name="credit-card" size={24} color="#fff" />
          </View>
          <Text style={styles.balanceAmount}>$26,968.00</Text>
          <Text style={styles.cardNumber}>**** **** **** 3765</Text>
        </View>

        <TouchableOpacity style={styles.addCardButton} onPress={() => setModalVisible(true)}>
          <Icon name="add" size={24} color="#fff" />
          <Text style={styles.addCardText}>Yeni Kart Ekle</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <View style={styles.modalHeader}>
                <Icon name="credit-card" size={24} color="#fff" />
                <Text style={styles.modalTitle}>Kart Ekle</Text>
              </View>
              <TextInput 
                style={styles.input}
                placeholder="İsim Soyisim"
                keyboardType="default"
              />
              
              <TextInput
                style={styles.input}
                placeholder="Kart Numarası"
                keyboardType="numeric"
                value={cardNumber}
                onChangeText={handleCardNumberChange}
                maxLength={19}
              />
              <TextInput
                style={styles.input}
                placeholder="Son Kullanma Tarihi (MM/YY)"
                keyboardType="numeric"
                value={expiryDate}
                onChangeText={handleExpiryDateChange}
                maxLength={5}
              />
              <TextInput
                style={styles.input}
                placeholder="CVV"
                keyboardType="numeric"
                secureTextEntry={true}
                value={cvv}
                onChangeText={handleCvvChange}
                maxLength={3}
              />
              <View style={styles.buttonContainer}>
                <Button title="İptal" onPress={handleCancel} />
                <Button title="Kaydet" onPress={() => setModalVisible(false)} />
              </View>
            </View>
          </View>
        </Modal>

        <View style={styles.menu}>
          <View style={styles.menuItem}>
            <Icon name="person" size={24} color="#4caf50" />
            <Text style={styles.menuText}>Kişisel Bilgiler</Text>
          </View>
          <View style={styles.menuItem}>
            <Icon name="lock" size={24} color="#4caf50" />
            <Text style={styles.menuText}>Gizlilik ve Güvenlik</Text>
          </View>
          <View style={styles.menuItem}>
            <Icon name="card-giftcard" size={24} color="#4caf50" />
            <Text style={styles.menuText}>Teklifler ve Ödüller</Text>
          </View>
          <View style={styles.menuItem}>
            <Icon name="help" size={24} color="#4caf50" />
            <Text style={styles.menuText}>Yardım</Text>
          </View>
          <View style={styles.menuItem}>
            <Icon name="exit-to-app" size={24} color="#4caf50" />
            <Text style={styles.menuText}>Çıkış Yap</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};



export default ProfileScreen;
