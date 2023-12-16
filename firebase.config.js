import { initializeApp } from "firebase/app";
import {getReactNativePersistence, initializeAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
    apiKey: "AIzaSyB-bo4IfkHSMcsH6ZDc6Og_ymAEMO0ijgw",
    authDomain: "ai-chat-01.firebaseapp.com",
    projectId: "ai-chat-01",
    storageBucket: "ai-chat-01.appspot.com",
    messagingSenderId: "398209514007",
    appId: "1:398209514007:web:0eae01db33a921a0bcba52",
    measurementId: "G-2S4XW0EMQD"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);

export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);

/*
IOS: 638697637722-kgj3icuat9ggo05qn6uetsjsr7vcug27.apps.googleusercontent.com
ANDROID: 638697637722-n50nno2tho7dob2hpd6fr186mdr48lio.apps.googleusercontent.com
 */