import React, { useState } from 'react';
import { Modal, Button, View, Text, ScrollView, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 100,
  },
  header: {
    backgroundColor: '#004d40',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileDetails: {
    flex: 1,
  },
  profileText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  userPhone: {
    color: '#fff',
    fontSize: 14,
    marginTop: 5,
  },
  userEmail: {
    color: '#fff',
    fontSize: 14,
    marginTop: 5,
  },
  avatarContainer: {
    width: 60,
    height: 60,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  balanceCard: {
    backgroundColor: '#1e88e5',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 20,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  balanceText: {
    color: '#fff',
    fontSize: 16,
  },
  balanceAmount: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 10,
  },
  cardNumber: {
    color: '#fff',
    fontSize: 16,
    marginTop: 15,
  },
  addCardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4caf50',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  addCardText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    color: '#000',
    marginLeft: 10,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  menu: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuText: {
    fontSize: 16,
    marginLeft: 15,
  },
});

export default ProfileScreen;
