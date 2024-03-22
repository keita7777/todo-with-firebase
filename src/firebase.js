import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCCEVsc26Q87mn-cyAINLmArl719uHpsk8",
  authDomain: "todo-d352c.firebaseapp.com",
  projectId: "todo-d352c",
  storageBucket: "todo-d352c.appspot.com",
  messagingSenderId: "121404618032",
  appId: "1:121404618032:web:8be373b28d2ddb86df04f5",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
