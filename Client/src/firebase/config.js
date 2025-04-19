import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD2ctOTUj2yKNLB1KFjd9wt3rPML8DTw6s",
    authDomain: "radical-9bec0.firebaseapp.com",
    projectId: "radical-9bec0",
    storageBucket: "radical-9bec0.firebasestorage.app",
    messagingSenderId: "461191472835",
    appId: "1:461191472835:web:bc209c3ca8226007e86476",
    measurementId: "G-KN5HV23BTF"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
