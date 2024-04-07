// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4i7nEwCJ5Mro9mD7RDWi2wBH3wr6ICu0",
  authDomain: "spck3-71f24.firebaseapp.com",
  projectId: "spck3-71f24",
  storageBucket: "spck3-71f24.appspot.com",
  messagingSenderId: "460702231577",
  appId: "1:460702231577:web:e285f61cc345c2dcb24e88",
  measurementId: "G-6VB3XS1XBP",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
