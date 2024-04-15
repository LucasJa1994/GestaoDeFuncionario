import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
const firebaseConfig = {
  apiKey: "AIzaSyDB8QBnCKd7ekrhhX4dSOy2dpodhSgIAcs",
  authDomain: "gestaodefuncionarios-8216c.firebaseapp.com",
  projectId: "gestaodefuncionarios-8216c",
  storageBucket: "gestaodefuncionarios-8216c.appspot.com",
  messagingSenderId: "411365356462",
  appId: "1:411365356462:web:b36ab079121ed09f9a4e3f",
  measurementId: "G-CWRV94SVJ8",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const db = getFirestore(app)

const storage = getStorage(app)
export { db, storage }
