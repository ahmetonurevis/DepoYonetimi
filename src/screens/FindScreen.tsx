import React from 'react';
import { View, Text, Dimensions, ScrollView } from 'react-native';
import { BarChart, PieChart } from 'react-native-chart-kit';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { styles } from '../css/findcss';

const screenWidth = Dimensions.get('window').width;

const FindScreen = () => {
  
  const stockIncreases = useSelector((state: RootState) => state.stock.stockIncreases);
  const stockDecreases = useSelector((state: RootState) => state.stock.stockDecreases);
  const products = useSelector((state: RootState) => state.stock.products);


  const totalIncome = stockDecreases.reduce((sum, item) => {
    const product = products.find(p => p.id === item.productId);
    return sum + (product ? product.salePrice * item.changeAmount : 0);
  }, 0);

  const totalExpense = stockIncreases.reduce((sum, item) => {
    const product = products.find(p => p.id === item.productId);
    return sum + (product ? product.purchasePrice * item.changeAmount : 0);
  }, 0);

  const totalProfit = totalIncome - totalExpense;

  const barData = {
    labels: stockIncreases.map(item => new Date(item.timestamp).toLocaleDateString()),
    datasets: [
      {
        data: stockIncreases.map(item => {
          const product = products.find(p => p.id === item.productId);
          return product ? product.purchasePrice * item.changeAmount : 0;
        }),
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
      },
      {
        data: stockDecreases.map(item => {
          const product = products.find(p => p.id === item.productId);
          return product ? product.salePrice * item.changeAmount : 0;
        }),
        color: (opacity = 1) => `rgba(0, 128, 0, ${opacity})`,
      },
    ],
  };


  return (
    <ScrollView style={styles.container}>
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Satışlar</Text>
          <Text style={styles.statValue}>₺{totalIncome}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Giderler</Text>
          <Text style={styles.statValue}>₺{totalExpense}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Kâr</Text>
          <Text style={styles.statValue}>₺{totalProfit}</Text>
        </View>
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Günlük Satışlar</Text>
        <BarChart
          data={barData}
          width={screenWidth - 30}
          height={220}
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            barPercentage: 0.5,
          }}
          style={styles.chart}
        />
      </View>
    </ScrollView>
  );
};

export default FindScreen;
