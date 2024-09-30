import React, { useEffect, useState } from 'react';
import { Keyboard, StyleSheet, Text, View, Image, TouchableOpacity, GestureResponderEvent } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import FindScreen from '../screens/FindScreen';
import DashboardScreen from '../screens/DashboardScreen';
import AddProductScreen from '../screens/AddProductScreen';
import ProductListScreen from '../screens/ProductListScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

interface CustomTabBarButtonProps {
  children: React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
}

const CustomTabBarButton: React.FC<CustomTabBarButtonProps> = ({ children, onPress }) => (
  <TouchableOpacity
    style={{
      top: -30,
      justifyContent: 'center',
      alignItems: 'center',
      ...styles.shadow,
    }}
    onPress={onPress}
  >
    <View
      style={{
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#e32f45',
      }}
    >
      {children}
    </View>
  </TouchableOpacity>
);

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddProductScreen"
        component={AddProductScreen}
        options={{ title: 'Ürün Ekle' }}
      />
      <Stack.Screen
        name="ProductListScreen"
        component={ProductListScreen}
        options={{ title: 'Ürün Listesi' }}
      />
    </Stack.Navigator>
  );
};

const BottomTabNavigator: React.FC = () => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true); 
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false); 
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarLabel: '',
        tabBarStyle: {
          position: 'absolute',
          bottom: 25,
          left: 20,
          right: 20,
          backgroundColor: '#ffffff',
          borderRadius: 15,
          height: 90,
          display: isKeyboardVisible ? 'none' : 'flex', 
          ...styles.shadow,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
              <Image
                source={require('../assets/icons/home.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#e32f45' : '#748c94',
                }}
              />
              <Text style={{ color: focused ? '#e32f45' : '#748c94', fontSize: 12 }}>
                Home
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Find"
        component={FindScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
              <Image
                source={require('../assets/icons/find.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#e32f45' : '#748c94',
                }}
              />
              <Text style={{ color: focused ? '#e32f45' : '#748c94', fontSize: 12 }}>
                Find
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../assets/icons/profile.png')}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
                tintColor: '#fff',
              }}
            />
          ),
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
        }}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
              <Image
                source={require('../assets/icons/settings.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#e32f45' : '#748c94',
                }}
              />
              <Text style={{ color: focused ? '#e32f45' : '#748c94', fontSize: 12 }}>
                Settings
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
              <Image
                source={require('../assets/icons/dashboard.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#e32f45' : '#748c94',
                }}
              />
              <Text style={{ color: focused ? '#e32f45' : '#748c94', fontSize: 12 }}>
                Dashboard
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default BottomTabNavigator;
