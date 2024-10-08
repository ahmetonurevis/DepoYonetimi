import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import firestore from '@react-native-firebase/firestore';
import { styles } from '../css/findcss';

const screenWidth = Dimensions.get('window').width;

interface DataMap {
  income: number;
  expense: number;
}

const FindScreen = () => {
  const [barData, setBarData] = useState({
    labels: [] as string[],
    datasets: [{ data: [] as number[] }, { data: [] as number[] }],
  });
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);

  useEffect(() => {
    const dataMap: Record<string, DataMap> = {};

    const unsubscribeIncreases = firestore()
      .collection('StockIncreases')
      .onSnapshot((snapshot) => {
        let totalExpenseSum = 0;

        snapshot.forEach((doc) => {
          const data = doc.data();
          if (data && data.timestamp) {
            const date = new Date(data.timestamp.seconds * 1000).toLocaleDateString();
            const totalAmount = data.totalAmount || 0;

            if (!dataMap[date]) {
              dataMap[date] = { income: 0, expense: 0 };
            }
            dataMap[date].expense += totalAmount;
            totalExpenseSum += totalAmount;
          }
        });

        setTotalExpense(totalExpenseSum);
        updateBarData(dataMap);
      });

    const unsubscribeDecreases = firestore()
      .collection('StockDecreases')
      .onSnapshot((snapshot) => {
        let totalIncomeSum = 0;

        snapshot.forEach((doc) => {
          const data = doc.data();
          if (data && data.timestamp) {
            const date = new Date(data.timestamp.seconds * 1000).toLocaleDateString();
            const totalAmount = data.totalAmount || 0;

            if (!dataMap[date]) {
              dataMap[date] = { income: 0, expense: 0 };
            }
            dataMap[date].income += totalAmount;
            totalIncomeSum += totalAmount;
          }
        });

        setTotalIncome(totalIncomeSum);
        setTotalProfit(totalIncomeSum - totalExpense);
        updateBarData(dataMap);
      });

    const updateBarData = (dataMap: Record<string, DataMap>) => {
      const labels: string[] = [];
      const incomeData: number[] = [];
      const expenseData: number[] = [];

      Object.keys(dataMap).forEach((date) => {
        const { income, expense } = dataMap[date];
        if (income > 0 || expense > 0) {
          labels.push(date);
          incomeData.push(income);
          expenseData.push(expense);
        }
      });

      setBarData({
        labels,
        datasets: [
          { data: incomeData },
          { data: expenseData },
        ],
      });
    };

    return () => {
      unsubscribeIncreases();
      unsubscribeDecreases();
    };
  }, [totalExpense]);

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
        <LineChart
          data={{
            labels: barData.labels,
            datasets: [
              { data: barData.datasets[0].data, color: () => '#4CAF50' }, 
              { data: barData.datasets[1].data, color: () => '#F44336' }, 
            ],
          }}
          width={screenWidth - 30}
          height={220}
          yAxisSuffix="₺"
          fromZero={true}  
          yAxisInterval={1}  
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0, 
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            propsForDots: {
              r: '4',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          bezier
          style={{
            marginVertical: 10,
            borderRadius: 16,
          }}
        />
      </View>
    </ScrollView>
  );
};

export default FindScreen;
