const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(
    "C:/Users/Mohmmad/Documents/vsProject/web/Class2Code/Backend/src/config/serviceAccountKey.json"
  ),
  storageBucket: process.env.FR_STORAGE_BUCKET,
});

const storage = admin.storage();

module.exports = storage;
