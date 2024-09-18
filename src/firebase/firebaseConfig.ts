// src/config/firebaseConfig.ts
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBWk_VJ0Eyx2REV_gBd3VWuHzybBNpzB44",
  authDomain: "depoyonetimi-3fd4c.firebaseapp.com",
  projectId: "depoyonetimi-3fd4c",
  storageBucket: "depoyonetimi-3fd4c.appspot.com",
  messagingSenderId: "756152498186",
  appId: "1:756152498186:web:f8b33f90996ddbb9f787f3",
  measurementId: "G-ET3C6KWMHY"
};

export const initializeFirebase = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig); // Firebase'i başlat
    console.log('Firebase initialized successfully!');
  } else {
    console.log('Firebase already initialized!');
  }
};
