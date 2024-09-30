import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 15,
      backgroundColor: '#f9f9f9',
    },
    balanceCard: {
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 10,
      marginBottom: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 15,
    },
    balanceRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    balanceItem: {
      alignItems: 'center',
    },
    balanceLabel: {
      fontSize: 18,
      color: '#888',
    },
    balanceValue: {
      fontSize: 22,
      fontWeight: 'bold',
    },
    chartTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    chart: {
      borderRadius: 10,
    },
  });