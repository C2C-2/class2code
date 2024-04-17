// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  child,
  push,
  ref,
  set,
  onValue,
  update,
} from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCjlW-VgZ05J5gWwLRsfRuUjsETmJV5lJI",
  authDomain: "class2code.firebaseapp.com",
  databaseURL: "https://class2code-default-rtdb.firebaseio.com",
  projectId: "class2code",
  storageBucket: "class2code.appspot.com",
  messagingSenderId: "221134602131",
  appId: "1:221134602131:web:2698ab692bfc3ce5f8f266",
  measurementId: "G-260LL3YSX9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

// Read data from the Realtime Database
export function read(path, callback) {
  console.log(path);
  const dbRef = ref(database, path);
  onValue(dbRef, (snapshot) => {
    const data = snapshot.val();
    callback(data);
  });
}

// Write data to the Realtime Database
export function write(path, data) {
  const dbRef = ref(database, path);
  set(dbRef, data);
}

export function updateData(path, data) {
  const newPostKey = push(child(ref(database), path)).key;

  const updates = {};
  updates[`${path}/` + newPostKey] = data;

  update(ref(database), updates);
  return newPostKey;
}

export const auth = getAuth(app);
