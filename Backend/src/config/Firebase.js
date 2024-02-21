const firebase = require("firebase/app");
require("firebase/storage");

const firebaseConfig = {
  apiKey: process.env.FR_API_KEY,
  authDomain: process.env.FR_AUTH_DOMAIN,
  projectId: process.env.FR_PROJECT_ID,
  storageBucket: process.env.FR_STORAGE_BUCKET,
  messagingSenderId: process.env.FR_MESSAGING_SENDER_ID,
  appId: process.env.FR_APP_ID,
  measurementId: "G-260LL3YSX9",
};
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

module.exports = storage;
