import { Animated, Dimensions, Easing, Image, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, View, PanResponder, KeyboardAvoidingView } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { SearchBar } from 'react-native-elements';


const { width, height } = Dimensions.get('window');
const AnimatedPath = Animated.createAnimatedComponent(Path);

interface HeaderProps {
  toggleAnimation: () => void;
  search: string;
  updateSearch: (text: string) => void;
  anim: Animated.Value;
}

const HeaderComponent: React.FC<HeaderProps> = ({ toggleAnimation, search, updateSearch, anim }) => {
  const partInterpolation1 = anim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['M 3,12.5 3.01,12.5', 'M 3,3 3.001,3', 'M 3,3 12.5,12.5'],
  });
  const partInterpolation2 = anim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['M 12.5,12.5 12.5005,12.5 12.501,12.5', 'M 12.5,12.5 12.5005,12.5 12.501,12.5', 'M 3,22 12.5,12.5 22,3'],
  });
  const partInterpolation3 = anim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['M 22,12.5 22.01,12.5', 'M 22,22 22.01,22', 'M 12.5,12.5 22,22'],
  });

  return (
    <View style={styles.headerContainer}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/logo.png')}
          resizeMode="contain"
          style={{
            width: width * 0.1,
            height: height * 0.05,
          }}
        />
      </View>

      <View style={styles.searchBarContainer}>
        <SearchBar
          placeholder="Arama"
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
  );
};

const styles = StyleSheet.create({
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
});

export default HeaderComponent;
