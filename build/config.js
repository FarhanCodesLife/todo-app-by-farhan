import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDflsOTK00p_JYA8DG5rh4Z6oR7j9cPydY",
    authDomain: "todo-app-by-farhan.firebaseapp.com",
    projectId: "todo-app-by-farhan",
    storageBucket: "todo-app-by-farhan.appspot.com",
    messagingSenderId: "244671113407",
    appId: "1:244671113407:web:5332f3b95c1189ab0c7e0a",
    measurementId: "G-XKK22K3T9G"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
