import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD-7jzYqNpbKFq-41bk6Y-pnWgYamkSt7I",
  authDomain: "reservacionproyecto-1be84.firebaseapp.com",
  projectId: "reservacionproyecto-1be84",
  storageBucket: "reservacionproyecto-1be84.firebasestorage.app",
  messagingSenderId: "622956702391",
  appId: "1:622956702391:web:d4a0cb9b3916ac52917b32",
  measurementId: "G-0LZMXVBTS2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }