import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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