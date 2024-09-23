import React from 'react';
import { View, StyleSheet } from 'react-native';
import BottomTabNavigator from '../navigation/BottomTabNavigator';

const MainContentComponent: React.FC = () => {
  return (
    <View style={styles.mainContent}>
      <BottomTabNavigator />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default MainContentComponent;
