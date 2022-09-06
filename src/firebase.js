// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"
import { getFirestore } from "firebase/firestore"


const firebaseConfig = {
    apiKey: "AIzaSyAi-eBtRf6owHWXVbhqp24_MXOXjYOlsmg",
    authDomain: "lets-chat-adeac.firebaseapp.com",
    projectId: "lets-chat-adeac",
    storageBucket: "lets-chat-adeac.appspot.com",
    messagingSenderId: "723477260925",
    appId: "1:723477260925:web:1e2d62256ae247bf5d9f14"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage();
export const db = getFirestore()
