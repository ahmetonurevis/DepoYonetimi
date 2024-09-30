import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f0f4f8',
    },
    scrollContainer: {
      padding: 16,
      flexGrow: 1,
      justifyContent: 'flex-start',
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