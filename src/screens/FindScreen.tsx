import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { styles } from '../styles/findcss';

const screenWidth = Dimensions.get('window').width;

const FindScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.balanceCard}>
        <Text style={styles.title}>Statistic</Text>
        <View style={styles.balanceRow}>
          <View style={styles.balanceItem}>
            <Text style={styles.balanceLabel}>Income</Text>
            <Text style={styles.balanceValue}>$5,440</Text>
          </View>
          <View style={styles.balanceItem}>
            <Text style={styles.balanceLabel}>Expense</Text>
            <Text style={styles.balanceValue}>$2,209</Text>
          </View>
        </View>
      </View>

      <Text style={styles.chartTitle}>Statistic Overview</Text>
      <BarChart
        data={{
          labels: ['Nov 1', 'Nov 10', 'Nov 20', 'Nov 30'],
          datasets: [
            {
              data: [2000, 3156, 1500, 4200],
            },
          ],
        }}
        width={screenWidth - 30}
        height={220}
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 128, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        style={styles.chart}
      />
    </ScrollView>
  );
};



export default FindScreen;
