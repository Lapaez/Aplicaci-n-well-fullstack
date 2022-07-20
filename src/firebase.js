import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9jjD0kEnpXgZhZbdql-6z6FpqZoW9Tcw",
  authDomain: "devs-united-b6320.firebaseapp.com",
  projectId: "devs-united-b6320",
  storageBucket: "devs-united-b6320.appspot.com",
  messagingSenderId: "914413294782",
  appId: "1:914413294782:web:ea52d0630e4de2027ffaef"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore();
export default firebaseApp;