import React, { useState, useRef } from 'react';
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
  PanResponder,
  KeyboardAvoidingView,  // Klavye ile etkileşim için eklendi
  Platform,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import Svg, { Path } from 'react-native-svg';
import { SearchBar } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from '@react-native-community/blur';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

const AnimatedPath = Animated.createAnimatedComponent(Path);

const App: React.FC = () => {
  const [anim] = useState(new Animated.Value(0));
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState<string>('');

  const easing = Easing.bezier(0.4, 0, 0.2, 1);
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event(
      [null, { dy: pan.y }],
      { useNativeDriver: false }
    ),
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
    outputRange: [width * -1, 0],
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
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}  // Klavye açıldığında kayma davranışı
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0} // iOS için klavye offset'i
      >
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="dark-content" />

          <View style={styles.headerContainer}>
            <View style={styles.logoContainer}>
              <Image
                source={require('./src/assets/logo.png')}
                resizeMode="contain"
                style={{
                  width: width * 0.1,
                  height: height * 0.05,
                }}
              />
            </View>

            <View style={styles.searchBarContainer}>
              <SearchBar
                placeholder="Search"
                onChangeText={(text: string) => updateSearch(text)}
                value={search}
                containerStyle={styles.searchBar}
                inputContainerStyle={styles.searchInput}
                searchIcon={{ name: 'search', size: width * 0.06 }}
              />
            </View>

            <View style={styles.hamburgerContainer}>
              <Pressable onPress={toggleAnimation}>
                <View style={styles.hamburger}>
                  <Svg width={width * 0.07} height={height * 0.07} viewBox="0 0 25 25" fill="none">
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

          {open && (
            <>
              <BlurView
                style={StyleSheet.absoluteFill}
                blurType="dark"
                blurAmount={6}
                reducedTransparencyFallbackColor="white"
              />

              <SafeAreaView style={styles.menuSheetContainer}>
                <LinearGradient
                  colors={['#ff9a9e', '#fad0c4', '#fad0c4']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 2, y: 2 }}
                  style={StyleSheet.absoluteFill}
                />
                <Animated.View
                  {...panResponder.panHandlers}
                  style={[
                    styles.menuSheet,
                    sheetAnimationStyle,
                    { transform: [{ translateY: pan.y }] },
                  ]}
                >
                  <LinearGradient
                    colors={['#ff9a9e', '#fad0c4', '#fad0c4']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 2, y: 2 }}
                    style={styles.gradientBackground}
                  >
                    <View style={styles.menuContainer}>
                      <Image
                        source={require('./src/assets/profil.png')}
                        style={{
                          width: width * 0.2,
                          height: width * 0.2,
                          borderRadius: (width * 0.2) / 2,
                          marginBottom: height * 0.02,
                        }}
                      />
                      <Text style={[styles.profileName, { fontSize: width * 0.05 }]}>
                        Ahmet Onur Evis
                      </Text>
                      <Text style={[styles.profileRole, { fontSize: width * 0.035 }]}>
                        Yönetici
                      </Text>

                      <View style={styles.menuItem}>
                        <Icon name="home" size={24} color="#540a0a" />
                        <Text style={[styles.menuText, { fontSize: width * 0.045 }]}>
                          Anasayfa
                        </Text>
                      </View>

                      <View style={styles.menuItem}>
                        <Icon name="inventory" size={24} color="#540a0a" />
                        <Text style={[styles.menuText, { fontSize: width * 0.045 }]}>
                          Ürünlerim
                        </Text>
                      </View>

                      <View style={styles.menuItem}>
                        <Icon name="shopping-cart" size={24} color="#540a0a" />
                        <Text style={[styles.menuText, { fontSize: width * 0.045 }]}>
                          Siparişler
                        </Text>
                      </View>

                      <View style={styles.menuItem}>
                        <Icon name="notifications" size={24} color="#540a0a" />
                        <Text style={[styles.menuText, { fontSize: width * 0.045 }]}>
                          Bildirimler
                        </Text>
                      </View>

                      <View style={styles.menuItem}>
                        <Icon name="support-agent" size={24} color="#540a0a" />
                        <Text style={[styles.menuText, { fontSize: width * 0.045 }]}>
                          Destek
                        </Text>
                      </View>

                      <View style={styles.menuItem}>
                        <Icon name="exit-to-app" size={24} color="#540a0a" />
                        <Text style={[styles.menuText, { fontSize: width * 0.045 }]}>
                          Çıkış Yap
                        </Text>
                      </View>

                      <Pressable onPress={toggleAnimation} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>Close</Text>
                      </Pressable>
                    </View>
                  </LinearGradient>
                </Animated.View>
              </SafeAreaView>
            </>
          )}
        </SafeAreaView>
      </KeyboardAvoidingView>
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
    padding: width * 0.02,
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
    borderRadius: width * 0.05,
  },
  hamburgerContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  hamburger: {
    alignItems: 'center',
    height: height * 0.07,
    justifyContent: 'center',
    width: width * 0.1,
  },
  menuSheetContainer: {
    position: 'absolute',
    height: '100%',
    width: '80%',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuSheet: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 3.84,
    elevation: 10,
  },
  gradientBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileName: {
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: height * 0.01,
  },
  profileRole: {
    color: '#fff',
    marginBottom: height * 0.02,
  },
  menuContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.02,
  },
  menuText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: width * 0.02,
    textAlign: 'left',
  },
  closeButton: {
    marginTop: height * 0.03,
    padding: height * 0.02,
    backgroundColor: '#fff',
    borderRadius: width * 0.02,
  },
  closeButtonText: {
    color: '#000',
    fontSize: width * 0.05,
    fontWeight: 'bold',
  },
});

export default App;
