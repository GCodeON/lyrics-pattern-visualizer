// import firebase from "firebase/app";
// import "firebase/firestore";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from  "firebase/firestore";

const firebaseConfig = {
    apiKey            : process.env. REACT_APP_FIREBASE_API_KEY,
    authDomain        : "lyrics-decoded.firebaseapp.com",
    databaseURL       : "https://lyrics-decoded-default-rtdb.firebaseio.com",
    projectId         : "lyrics-decoded",
    storageBucket     : "lyrics-decoded.appspot.com",
    messagingSenderId : "929592182442",
    appId             : "1:929592182442:web:7d616012a3d1436665f2d3",
    measurementId     : "G-SWR209Q8G7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore();

// export const songs = collection(db, 'songs');

// export function getDocs(songs);

