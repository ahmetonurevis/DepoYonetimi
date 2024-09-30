import React, { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RNPickerSelect from 'react-native-picker-select';
import firestore from '@react-native-firebase/firestore'; 

const SettingsScreen = () => {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('Türkçe');
  const [languages, setLanguages] = useState([]); 

  const toggleNotifications = () => setIsNotificationsEnabled((previousState) => !previousState);
  const toggleDarkMode = () => setIsDarkModeEnabled((previousState) => !previousState);


  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const languageCollection = await firestore().collection('Languages').get();
        const languageList = languageCollection.docs.map(doc => ({
          label: doc.data().languages,
          value: doc.data().languages
        }));
        setLanguages(languageList); 
      } catch (error) {
        console.error("Error fetching languages: ", error);
      }
    };

    fetchLanguages();
  }, []);

  const dynamicStyles = isDarkModeEnabled ? darkStyles : lightStyles;

  return (
    <ScrollView style={dynamicStyles.container}>
      <View style={dynamicStyles.header}>
        <Text style={dynamicStyles.title}>Ayarlar</Text>
      </View>

      <View style={dynamicStyles.settingsItem}>
        <Icon name="notifications" size={24} color={isDarkModeEnabled ? "#90caf9" : "#4caf50"} />
        <Text style={dynamicStyles.settingsText}>Bildirimler</Text>
        <Switch
          value={isNotificationsEnabled}
          onValueChange={toggleNotifications}
        />
      </View>

      <View style={dynamicStyles.settingsItem}>
        <Icon name="dark-mode" size={24} color={isDarkModeEnabled ? "#90caf9" : "#4caf50"} />
        <Text style={dynamicStyles.settingsText}>Karanlık Mod</Text>
        <Switch
          value={isDarkModeEnabled}
          onValueChange={toggleDarkMode}
        />
      </View>

      <View style={dynamicStyles.settingsItem}>
        <Icon name="language" size={24} color={isDarkModeEnabled ? "#90caf9" : "#4caf50"} />        
          <Text style={dynamicStyles.settingsText}>Dil Seçimi</Text>
          <View style={dynamicStyles.textGroup}>
          <RNPickerSelect
            onValueChange={(value) => setSelectedLanguage(value)}
            items={languages} 
            value={selectedLanguage}
            placeholder={{ label: 'Dil Seçiniz...', value: null }}            
          />
        </View>
      </View>

      <View style={dynamicStyles.settingsItem}>
        <Icon name="security" size={24} color={isDarkModeEnabled ? "#90caf9" : "#4caf50"} />
        <View>
        <Text style={dynamicStyles.settingsText}>Hesap Güvenliği</Text>
        </View>
        <View>
          <Text style={dynamicStyles.settingsSubText}>Güçlü</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    padding: 20,
    backgroundColor: '#004d40',
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  settingsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  textGroup: {
    flex: 1,
    marginLeft: 80,
  },
  settingsText: {
    fontSize: 18,
  },
  settingsSubText: {
    fontSize: 16,
    color: '#888',
  },
});

const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  header: {
    padding: 20,
    backgroundColor: '#333',
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  settingsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#1f1f1f',
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  textGroup: {
    flex: 1,
    marginLeft: 80,
  },
  settingsText: {
    fontSize: 18,
    color: '#fff',
  },
  settingsSubText: {
    fontSize: 16,
    color: '#bbb',
  },
});

export default SettingsScreen;
