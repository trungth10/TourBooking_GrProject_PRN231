// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC6LmWZm9NHWVov5WH81JrPHe35EEdAm_4",
  authDomain: "tour-booking-admin.firebaseapp.com",
  projectId: "tour-booking-admin",
  storageBucket: "tour-booking-admin.appspot.com",
  messagingSenderId: "357361299495",
  appId: "1:357361299495:web:408796cd5e77fdc72f5e02",
  measurementId: "G-58YFYTWK73",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
