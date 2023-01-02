// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
//import {firebase} from 'firebase';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: "AIzaSyBhoMpbqHW8Xg60Cjks1SEHm3Obs-fdOdY",
  // authDomain: "react-getting-started-f71c2.firebaseapp.com",
  // databaseURL: "https://react-getting-started-f71c2-default-rtdb.firebaseio.com",
  // projectId: "react-getting-started-f71c2",
  // storageBucket: "react-getting-started-f71c2.appspot.com",
  // messagingSenderId: "743085710224",
  // appId: "1:743085710224:web:1a3435e0b84eb56a153115"


  apiKey: process.env.NEXT_PUBLIC_apiKey,
  authDomain: process.env.NEXT_PUBLIC_authDomain,
  databaseURL: process.env.NEXT_PUBLIC_databaseURL,
  projectId: process.env.NEXT_PUBLIC_projectId,
  storageBucket: process.env.NEXT_PUBLIC_storageBucket,
  messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
  appId: process.env.NEXT_PUBLIC_appId
};

//firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);