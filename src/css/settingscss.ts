import { StyleSheet } from "react-native";

export const lightStyles = StyleSheet.create({
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
      color: '#000000',
      fontSize: 18,
    },
    settingsSubText: {
      fontSize: 16,
      color: '#000',
    },
  });
  
  export const darkStyles = StyleSheet.create({
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