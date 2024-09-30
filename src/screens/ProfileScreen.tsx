import React, { useState } from 'react';
import { Modal, Button } from 'react-native';
import styled from 'styled-components/native';
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
    <SafeArea>
      <Container>
        <Header>
          <ProfileDetails>
            <ProfileText>Profilim</ProfileText>
            <UserName>Ahmet Onur Evis</UserName>
            <UserPhone>(546) 563-8606</UserPhone>
            <UserEmail>evis4798@gmail.com</UserEmail>
          </ProfileDetails>
          <AvatarContainer>
            <Avatar source={{ uri: 'https://randomuser.me/api/portraits/men/45.jpg' }} />
          </AvatarContainer>
        </Header>

        <BalanceCard>
          <CardRow>
            <BalanceText>Bakiye</BalanceText>
            <Icon name="credit-card" size={24} color="#fff" />
          </CardRow>
          <BalanceAmount>$26,968.00</BalanceAmount>
          <CardNumber>**** **** **** 3765</CardNumber>
        </BalanceCard>

        <AddCardButton onPress={() => setModalVisible(true)}>
          <Icon name="add" size={24} color="#fff" />
          <AddCardText>Yeni Kart Ekle</AddCardText>
        </AddCardButton>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <ModalContainer>
            <ModalView>
              <ModalHeader>
                <Icon name="credit-card" size={24} color="#fff" />
                <ModalTitle>Kart Ekle</ModalTitle>
              </ModalHeader>
              <Input
                placeholder="Kart Numarası"
                keyboardType="numeric"
                value={cardNumber}
                onChangeText={handleCardNumberChange}
                maxLength={19}
              />
              <Input
                placeholder="Son Kullanma Tarihi (MM/YY)"
                keyboardType="numeric"
                value={expiryDate}
                onChangeText={handleExpiryDateChange}
                maxLength={5}
              />
              <Input
                placeholder="CVV"
                keyboardType="numeric"
                secureTextEntry={true}
                value={cvv}
                onChangeText={handleCvvChange}
                maxLength={3}
              />
              <ButtonContainer>
                <Button title="İptal" onPress={handleCancel} />
                <Button title="Kaydet" onPress={() => setModalVisible(false)} />
              </ButtonContainer>
            </ModalView>
          </ModalContainer>
        </Modal>

        <Menu>
          <MenuItem>
            <Icon name="person" size={24} color="#4caf50" />
            <MenuText>Kişisel Bilgiler</MenuText>
          </MenuItem>
          <MenuItem>
            <Icon name="lock" size={24} color="#4caf50" />
            <MenuText>Gizlilik ve Güvenlik</MenuText>
          </MenuItem>
          <MenuItem>
            <Icon name="card-giftcard" size={24} color="#4caf50" />
            <MenuText>Teklifler ve Ödüller</MenuText>
          </MenuItem>
          <MenuItem>
            <Icon name="help" size={24} color="#4caf50" />
            <MenuText>Yardım</MenuText>
          </MenuItem>
          <MenuItem>
            <Icon name="exit-to-app" size={24} color="#4caf50" />
            <MenuText>Çıkış Yap</MenuText>
          </MenuItem>
        </Menu>
      </Container>
    </SafeArea>
  );
};

const SafeArea = styled.SafeAreaView`
  flex: 1;
  background-color: #f5f5f5;
`;

const Container = styled.ScrollView`
  flex: 1;
  padding: 20px;
  padding-bottom: 100px;
`;

const Header = styled.View`
  background-color: #004d40;
  padding: 20px;
  border-radius: 15px;
  margin-bottom: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ProfileDetails = styled.View`
  flex: 1;
`;

const ProfileText = styled.Text`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const UserName = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
`;

const UserPhone = styled.Text`
  color: #fff;
  font-size: 14px;
  margin-top: 5px;
`;

const UserEmail = styled.Text`
  color: #fff;
  font-size: 14px;
  margin-top: 5px;
`;

const AvatarContainer = styled.View`
  width: 60px;
  height: 60px;
`;

const Avatar = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 30px;
`;

const BalanceCard = styled.View`
  background-color: #1e88e5;
  padding: 20px;
  border-radius: 15px;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 10px;
  elevation: 3;
  margin-bottom: 20px;
`;

const CardRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const BalanceText = styled.Text`
  color: #fff;
  font-size: 16px;
`;

const BalanceAmount = styled.Text`
  color: #fff;
  font-size: 28px;
  font-weight: bold;
  margin-top: 10px;
`;

const CardNumber = styled.Text`
  color: #fff;
  font-size: 16px;
  margin-top: 15px;
`;

const AddCardButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #4caf50;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const AddCardText = styled.Text`
  color: #fff;
  font-size: 18px;
  margin-left: 10px;
`;

const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalView = styled.View`
  width: 90%;
  background-color: white;
  border-radius: 20px;
  padding: 20px;
  align-items: center;
`;

const ModalHeader = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const ModalTitle = styled.Text`
  font-size: 20px;
  color: #000;
  margin-left: 10px;
`;

const Input = styled.TextInput`
  width: 100%;
  border-width: 1px;
  border-color: #ccc;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 15px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
`;

const Menu = styled.View`
  background-color: #fff;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 20px;
`;

const MenuItem = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 15px;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
`;

const MenuText = styled.Text`
  font-size: 16px;
  margin-left: 15px;
`;

export default ProfileScreen;
