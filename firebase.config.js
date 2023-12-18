import { initializeApp } from "firebase/app";
import {getReactNativePersistence, initializeAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {

    apiKey: "AIzaSyAaQvHP9Syxu-ycHqXCdHcGtTGEK-vczjc",

    authDomain: "thehub-66eb1.firebaseapp.com",

    projectId: "thehub-66eb1",

    storageBucket: "thehub-66eb1.appspot.com",

    messagingSenderId: "395573890829",

    appId: "1:395573890829:web:5fb7f187df79fdbbbdea44",

    measurementId: "G-5X4QZ6QCEY"

};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);

export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);

