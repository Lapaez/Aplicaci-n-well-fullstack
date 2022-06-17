import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGb6q1dJxsvc3U5d2yCz0M-HIpt6nHzMg",
  authDomain: "app-dev-united.firebaseapp.com",
  projectId: "app-dev-united",
  storageBucket: "app-dev-united.appspot.com",
  messagingSenderId: "488406160332",
  appId: "1:488406160332:web:81ccfbba371c8a0acf0369"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore();
export default firebaseApp;