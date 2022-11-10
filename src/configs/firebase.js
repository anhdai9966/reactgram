// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJ2MtskK33P1WWdsCn5KRz_XOHTQn13xE",
  authDomain: "reactjs-api-a31a3.firebaseapp.com",
  databaseURL: "https://reactjs-api-a31a3-default-rtdb.firebaseio.com",
  projectId: "reactjs-api-a31a3",
  storageBucket: "reactjs-api-a31a3.appspot.com",
  messagingSenderId: "466254532477",
  appId: "1:466254532477:web:ca48108627cfa7bbee0614",
  measurementId: "G-XWRB84HDJS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app)
auth.languageCode = 'vi';

const provider = new GoogleAuthProvider();

export { db, auth, provider };
