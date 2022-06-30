import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqEOjWCSZttwPZrWAecenLDxMRzXYplrM",
  authDomain: "aplicacion-devs-united.firebaseapp.com",
  projectId: "aplicacion-devs-united",
  storageBucket: "aplicacion-devs-united.appspot.com",
  messagingSenderId: "523902909995",
  appId: "1:523902909995:web:0da199acab4b023929346e"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore();
export default firebaseApp;