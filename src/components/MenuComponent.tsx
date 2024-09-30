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
    <View style={styles.container}>
      <Pressable style={StyleSheet.absoluteFill} onPress={toggleAnimation}>
        <BlurView style={StyleSheet.absoluteFill} blurType="dark" blurAmount={6} reducedTransparencyFallbackColor="white" />
      </Pressable>
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
            <View style={styles.profileContainer}>
                <Image
                  source={require('../assets/profil.png')}
                  style={styles.profileImage}
                />
                <View>
                  <Text style={styles.profileName}>Ahmet Onur Evis</Text>
                  <Text style={styles.profileRole}>Yönetici</Text>
                </View>
              </View>
              {['Anasayfa', 'Ürün Ekle', 'Siparişler', 'Ayarlar', 'Destek', 'Çıkış Yap'].map((menuItem, index) => (
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
    </View>
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
    case 'Ayarlar':
      return 'settings';
    case 'Destek':
      return 'support-agent';
    case 'Çıkış Yap':
      return 'exit-to-app';
    default:
      return 'home';
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute', 
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  menuSheetContainer: {
    position: 'absolute', 
    height: '100%',
    width: '80%',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileContainer: {
    flexDirection: 'row', 
    alignItems: 'flex-end',
    marginBottom: height * 0.03,
    paddingHorizontal: width * 0.05,
  },
  profileImage: {
    width: width * 0.2,
    height: width * 0.2,
    borderRadius: (width * 0.2) / 2, 
    marginRight: width * 0.02,
  },
  profileName: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileRole: {
    fontSize: width * 0.04,
    color: '#fff',
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
  menuContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: height * 0.02,
    width: '100%',  
    borderBottomWidth: 0.8,  
    borderBottomColor: '#ddd',  
    paddingHorizontal: width * 0.05,  
  },
  menuText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: width * 0.05,
    fontSize: width * 0.045,
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
