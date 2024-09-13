import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCU4cs3RF2hWP2Aeqh-4bMQkFY-Br885To",
    authDomain: "week7-shijie.firebaseapp.com",
    projectId: "week7-shijie",
    storageBucket: "week7-shijie.appspot.com",
    messagingSenderId: "505765161094",
    appId: "1:505765161094:web:3d797b2f3402eba3b44907"
};

initializeApp(firebaseConfig);

const db = getFirestore();

export default db;