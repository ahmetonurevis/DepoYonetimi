import React from 'react';
import { View, Text, StyleSheet, Dimensions, Pressable, Image, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from '@react-native-community/blur';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

interface MenuProps {
  open: boolean;
  toggleAnimation: () => void;
  panResponder: any;
  pan: Animated.ValueXY;
  sheetAnimationStyle: any;
}

const MenuComponent: React.FC<MenuProps> = ({ open, toggleAnimation, panResponder, pan, sheetAnimationStyle }) => {
  if (!open) return null;

  return (
    <>
      <BlurView style={StyleSheet.absoluteFill} blurType="dark" blurAmount={6} reducedTransparencyFallbackColor="white" />
      <View style={styles.menuSheetContainer}>
        <LinearGradient
          colors={['#ff9a9e', '#fad0c4', '#fad0c4']}
          start={{ x: 0, y: 0 }}
          end={{ x: 2, y: 2 }}
          style={StyleSheet.absoluteFill}
        />
        <Animated.View {...panResponder.panHandlers} style={[styles.menuSheet, sheetAnimationStyle, { transform: [{ translateY: pan.y }] }]}>
          <LinearGradient colors={['#ff9a9e', '#fad0c4', '#fad0c4']} start={{ x: 0, y: 0 }} end={{ x: 2, y: 2 }} style={styles.gradientBackground}>
            <View style={styles.menuContainer}>
              <Image
                source={require('../assets/profil.png')}
                style={{
                  width: width * 0.2,
                  height: width * 0.2,
                  borderRadius: (width * 0.2) / 2,
                  marginBottom: height * 0.02,
                }}
              />
              <Text style={[styles.profileName, { fontSize: width * 0.05 }]}>Ahmet Onur Evis</Text>
              <Text style={[styles.profileRole, { fontSize: width * 0.035 }]}>Yönetici</Text>

              {['Anasayfa', 'Ürünlerim', 'Siparişler', 'Bildirimler', 'Destek', 'Çıkış Yap'].map((menuItem, index) => (
                <View style={styles.menuItem} key={index}>
                  <Icon name={getIconName(menuItem)} size={24} color="#540a0a" />
                  <Text style={[styles.menuText, { fontSize: width * 0.045 }]}>{menuItem}</Text>
                </View>
              ))}

              <Pressable onPress={toggleAnimation} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </Pressable>
            </View>
          </LinearGradient>
        </Animated.View>
      </View>
    </>
  );
};

const getIconName = (menuItem: string) => {
  switch (menuItem) {
    case 'Anasayfa':
      return 'home';
    case 'Ürünlerim':
      return 'inventory';
    case 'Siparişler':
      return 'shopping-cart';
    case 'Bildirimler':
      return 'notifications';
    case 'Destek':
      return 'support-agent';
    case 'Çıkış Yap':
      return 'exit-to-app';
    default:
      return 'home';
  }
};

const styles = StyleSheet.create({
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

export default MenuComponent;