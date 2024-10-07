import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import firestore from '@react-native-firebase/firestore';
import { styles } from '../css/findcss';

const screenWidth = Dimensions.get('window').width;

const FindScreen = () => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);

  useEffect(() => {
    const unsubscribeIncreases = firestore().collection('StockIncreases').onSnapshot(snapshot => {
      let expense = 0;
      snapshot.forEach(doc => {
        const data = doc.data();
        const totalAmount = data.totalAmount || 0;
        expense += totalAmount;
      });
      setTotalExpense(expense);
    });

    const unsubscribeDecreases = firestore().collection('StockDecreases').onSnapshot(snapshot => {
      let income = 0;
      snapshot.forEach(doc => {
        const data = doc.data();
        const totalAmount = data.totalAmount || 0;
        income += totalAmount;
      });
      setTotalIncome(income);
      setTotalProfit(income - totalExpense);
    });

    return () => {
      unsubscribeIncreases();
      unsubscribeDecreases();
    };
  }, [totalExpense]);

  const barData = {
    labels: ['Gelirler', 'Giderler'],
    datasets: [
      {
        data: [totalIncome, totalExpense],
      },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <ScrollView
        horizontal
        style={styles.statsContainer}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        showsHorizontalScrollIndicator={false}
      >
        <View style={[styles.statCard, { backgroundColor: '#4CAF50' }]}>
          <Text style={styles.statLabel}>Gelirler</Text>
          <Text style={styles.statValue}>₺{totalIncome}</Text>
        </View>

        <View style={[styles.statCard, { backgroundColor: '#F44336' }]}>
          <Text style={styles.statLabel}>Giderler</Text>
          <Text style={styles.statValue}>₺{totalExpense}</Text>
        </View>

        <View style={[styles.statCard, { backgroundColor: totalProfit >= 0 ? '#2196F3' : '#F44336' }]}>
          <Text style={styles.statLabel}>{totalProfit >= 0 ? 'Kar' : 'Zarar'}</Text>
          <Text style={styles.statValue}>₺{totalProfit}</Text>
        </View>
      </ScrollView>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Gelir ve Gider Grafiği</Text>
        <BarChart
          data={barData}
          width={screenWidth - 30}
          height={220}
          yAxisSuffix="₺"
          yAxisInterval={1} 
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0, 
            color: (opacity = 1) => 'rgba(0, 0, 0, ' + opacity + ')', 
            labelColor: (opacity = 1) => 'rgba(0, 0, 0, ' + opacity + ')',
            barPercentage: 0.5, 
            barRadius: 5, 
            propsForBackgroundLines: {
              stroke: '#e3e3e3', 
              strokeDasharray: '', 
            },            
          }}
          style={{
            marginVertical: 10,
            borderRadius: 16,
          }}
          showBarTops={false}
          fromZero={true}
        />
      </View>
    </ScrollView>
  );
};

export default FindScreen;