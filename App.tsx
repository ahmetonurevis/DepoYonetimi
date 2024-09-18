import React, { useState } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import Svg, { Path } from 'react-native-svg';
import { SearchBar } from 'react-native-elements'; 
import LinearGradient from 'react-native-linear-gradient';


const AnimatedPath = Animated.createAnimatedComponent(Path);

const App: React.FC = () => {
  const [anim] = useState(new Animated.Value(0));
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState<string>(''); 

  const easing = Easing.bezier(0.4, 0, 0.2, 1);

  const toggleAnimation = () => {
    Animated.timing(anim, {
      toValue: open ? 0 : 1,
      duration: 400,
      easing,
      useNativeDriver: true,
    }).start();
    setOpen(!open);
  };

  
  const partInterpolation1 = anim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['M 3,12.5 3.01,12.5', 'M 3,3 3.001,3', 'M 3,3 12.5,12.5'],
  });
  const partInterpolation2 = anim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [
      'M 12.5,12.5 12.5005,12.5 12.501,12.5',
      'M 12.5,12.5 12.5005,12.5 12.501,12.5',
      'M 3,22 12.5,12.5 22,3',
    ],
  });
  const partInterpolation3 = anim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [
      'M 22,12.5 22.01,12.5',
      'M 22,22 22.01,22',
      'M 12.5,12.5 22,22',
    ],
  });

  
  const sheetInterpolation = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [Dimensions.get('window').width * -1, 0],
  });
  const sheetAnimationStyle = {
    transform: [
      {
        translateX: sheetInterpolation,
      },
    ],
  };

  
  const updateSearch = (text: string) => {
    setSearch(text);
  };

  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />

        
        <View style={styles.headerContainer}>
          
          <View style={styles.logoContainer}>
            <Image 
              source={require('./src/assets/logo.png')} 
              resizeMode='contain'
              style={{ 
                width: 50, 
                height: 50 
              }} 
            /> 
          </View>

          
          <View style={styles.searchBarContainer}>
            <SearchBar
              placeholder=""
              onChangeText={(text: string) => updateSearch(text)} 
              value={search}
              containerStyle={styles.searchBar}
              inputContainerStyle={styles.searchInput}
              searchIcon={{ name:'search', size: 24 }}
            />
          </View>

          
          <View style={styles.hamburgerContainer}>
            <Pressable onPress={toggleAnimation}>
              <View style={styles.hamburger}>
                <Svg width="25" height="25" viewBox="0 0 25 25" fill="none">
                  <AnimatedPath
                    d={partInterpolation1}
                    fill="none"
                    stroke="#282828"
                    strokeWidth={3}
                    strokeLinecap="round"
                  />
                  <AnimatedPath
                    d={partInterpolation2}
                    fill="none"
                    stroke="#282828"
                    strokeWidth={3}
                    strokeLinecap="round"
                  />
                  <AnimatedPath
                    d={partInterpolation3}
                    fill="none"
                    stroke="#282828"
                    strokeWidth={3}
                    strokeLinecap="round"
                  />
                </Svg>
              </View>
            </Pressable>
          </View>
        </View>

        
        <BottomTabNavigator />

        {/* siyah ekran */}
        {open && (
  <SafeAreaView style={styles.menuSheetContainer}>
    <Animated.View style={[styles.menuSheet, sheetAnimationStyle]}>
      <LinearGradient
        colors={['#ff9a9e', '#fad0c4', '#fad0c4']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBackground}
      >
        <View style={styles.menuContainer}>
          <Text style={styles.menuText}>Deneme</Text>
          <Text style={styles.menuText}>Menu Item 2</Text>
          <Text style={styles.menuText}>Menu Item 3</Text>

          <Pressable onPress={toggleAnimation} style={styles.backButton}>
            <Text style={styles.backButtonText}>Geri Dön</Text>
          </Pressable>
        </View>
      </LinearGradient>
    </Animated.View>
  </SafeAreaView>
)}

      </SafeAreaView>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  searchBarContainer: {
    flex: 2,
    justifyContent: 'center',
  },
  searchBar: {
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
  },
  searchInput: {
    backgroundColor: '#f1f1f1',
    borderRadius: 20,
  },
  gradientBackground: {
    flex: 1,  
    width: '100%',  
    height: '100%',  
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 0,  
  },
  hamburgerContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  hamburger: {
    alignItems: 'center',
    height: 50,
    justifyContent: 'center',
    width: 50,
  },
  menuSheetContainer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuSheet: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  backButton: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  backButtonText: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default App;