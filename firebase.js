// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCuTFEFF25X5OXaSKwYAM8lh8tATqSQs_w",
  authDomain: "examcenter-aae9d.firebaseapp.com",
  databaseURL: "https://examcenter-aae9d-default-rtdb.firebaseio.com",
  projectId: "examcenter-aae9d",
  storageBucket: "examcenter-aae9d.appspot.com",
  messagingSenderId: "822777889",
  appId: "1:822777889:web:36c41ac1e31444ffdaeb60"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export default app;

