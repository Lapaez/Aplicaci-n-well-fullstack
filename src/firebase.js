import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAI2tbNU9vGUW0ge1gyXpc86nIEFHF2fT0",
  authDomain: "devps-united-46f06.firebaseapp.com",
  projectId: "devps-united-46f06",
  storageBucket: "devps-united-46f06.appspot.com",
  messagingSenderId: "212309525697",
  appId: "1:212309525697:web:2af64196fc44e056768040"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore();
export default firebaseApp;