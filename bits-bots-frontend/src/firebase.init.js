// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXGCgYzl9aTxqihmOgFD5-w2LJxkNpTi0",
  authDomain: "bits-bots-4bc52.firebaseapp.com",
  projectId: "bits-bots-4bc52",
  storageBucket: "bits-bots-4bc52.appspot.com",
  messagingSenderId: "481364182519",
  appId: "1:481364182519:web:b6fc2e63e8d8b693e79af2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export default auth;
