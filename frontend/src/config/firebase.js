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
  remove,
} from "firebase/database";
import { getAuth } from "firebase/auth";
import {
  getStorage,
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const firebaseConfig = {
...
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

// Initialize Firebase Storage and get a reference to the service
const storage = getStorage(app);

// Read data from the Realtime Database
export function read(path, callback) {
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

// Upload image to Firebase Storage
export function uploadImage(file) {
  return new Promise((resolve, reject) => {
    const storageRefVar = storageRef(storage, `userImages/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRefVar, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Track upload progress (optional)
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        // Handle upload error
        console.error("Upload failed:", error);
        reject(error);
      },
      () => {
        // Upload completed successfully
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            resolve(downloadURL);
          })
          .catch((error) => {
            console.error("Error getting download URL:", error);
            reject(error);
          });
      }
    );
  });
}

export function deleteImage(imagePath) {
  const imageRef = storageRef(storage, imagePath);

  return deleteObject(imageRef)
    .then(() => {
      console.log("Image deleted successfully");
    })
    .catch((error) => {
      console.error("Error deleting image:", error);
    });
}

export function updateField(path, data) {
  // Create an update object where the keys are paths to update and the values are new data
  const updates = {};
  updates[path] = data;

  // Use the update method to merge the new data into the existing data at the specified path
  return update(ref(database), updates);
}

export function updateFieldWithKey(path, data) {
  const database = getDatabase();
  const newNotificationRef = push(ref(database, path));
  const newKey = newNotificationRef.key;
  const updates = {};
  updates[`${path}/${newKey}`] = data;
  return update(ref(database), updates);
}

export function deleteFieldAtPath(path) {
  const database = getDatabase();
  return remove(ref(database, path))
    .then(() => {
      console.log("Data deleted successfully");
    })
    .catch((error) => {
      console.error("Error deleting data:", error);
    });
}

export const auth = getAuth(app);
