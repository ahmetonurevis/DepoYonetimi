import React, { useState, useRef, useEffect } from 'react';
import { Animated, Dimensions, Easing, PanResponder, KeyboardAvoidingView, SafeAreaView, StatusBar, StyleSheet, BackHandler, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import HeaderComponent from './src/components/HeaderComponent';
import MenuComponent from './src/components/MenuComponent';
import MainContentComponent from './src/components/MainContentComponent';
import { Provider } from 'react-redux'; 
import { store } from './src/redux/store'; 

const { width } = Dimensions.get('window');

const App: React.FC = () => {
  const [anim] = useState(new Animated.Value(0));
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState<string>('');

  const easing = Easing.bezier(0.4, 0, 0.2, 1);
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, { dy: pan.y }], { useNativeDriver: false }),
    onPanResponderRelease: () => {
      Animated.spring(pan, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: false,
      }).start();
    },
  });

  const toggleAnimation = () => {
    Animated.timing(anim, {
      toValue: open ? 0 : 1,
      duration: 400,
      easing,
      useNativeDriver: true,
    }).start();
    setOpen(!open);
  };

  const sheetInterpolation = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [width * -1, 0],
  });

  const sheetAnimationStyle = {
    transform: [{ translateX: sheetInterpolation }],
  };

  const updateSearch = (text: string) => {
    setSearch(text);
  };

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Bekleyin!', 'Çıkmak istediğinize emin misiniz?', [
        {
          text: 'Vazgeç',
          onPress: () => null,
          style: 'cancel',
        },
        { text: 'EVET', onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);

  return (
    <Provider store={store}> 
      <NavigationContainer>
        <KeyboardAvoidingView style={styles.container} behavior="height" keyboardVerticalOffset={0}>
          <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <HeaderComponent toggleAnimation={toggleAnimation} search={search} updateSearch={updateSearch} anim={anim} />
            <MainContentComponent />
            <MenuComponent
              open={open}
              toggleAnimation={toggleAnimation}
              panResponder={panResponder}
              pan={pan}
              sheetAnimationStyle={sheetAnimationStyle}
            />
          </SafeAreaView>
        </KeyboardAvoidingView>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backAlertContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;
