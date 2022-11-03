import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  getIdToken,
  onAuthStateChanged,
  onIdTokenChanged,
} from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJ2MtskK33P1WWdsCn5KRz_XOHTQn13xE",
  authDomain: "reactjs-api-a31a3.firebaseapp.com",
  databaseURL: "https://reactjs-api-a31a3-default-rtdb.firebaseio.com",
  projectId: "reactjs-api-a31a3",
  storageBucket: "reactjs-api-a31a3.appspot.com",
  messagingSenderId: "466254532477",
  appId: "1:466254532477:web:ca48108627cfa7bbee0614",
  measurementId: "G-XWRB84HDJS",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = getAuth(app);
const email = "test@gmail.com";
const password = "123456";

// createUserWithEmailAndPassword(auth, "test@gmail.com", "12345")

// createUserWithEmailAndPassword(auth, email, password);
// firebase.auth().createUserWithEmailAndPassword(email, password)
//       .then((user) => loginUserSuccess(dispatch, user))
//       .catch(() => createUserFail(dispatch));
// signInWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in
//     const user = userCredential.user;
//     console.log("🚀 user:", user);
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//   });

  // auth.signOut().then(user => {
  //   console.log(user)
  // })
// onAuthStateChanged(auth, (userCred) => {
//   if (userCred) {
//     userCred.getIdToken().then((token) => {
//       console.log(token);
//     });
//   }
// });
// const idToken = getIdToken(true)

onIdTokenChanged(auth, (currentUser) => {
  console.log(currentUser);
});

// console.log(idToken)
// const unsubscribe = auth().onAuthStateChanged((user) => {
//   if (user) {
//     console.log("USER SIGNED IN: ", user);
//     user.getIdToken().then((token) => console.log("TOKEN: ", token)); //undefined
//   } else {
//   }
// });
// console.log(unsubscribe);

// if (!auth().currentUser) {
//   auth().signInAnonymously();
// }

// const getIdToken = async () => {
//   let idToken = await AsyncStorage.getItem("id_token")
//   const expiration = await AsyncStorage.getItem("expiration")

//   if (Number(expiration) > moment().unix()) {
//    return idToken
//   }

//   idToken = await firebase.auth().currentUser.getIdToken(true)
//   // console.log(idToken)

//   await AsyncStorage.setItem("id_token", idToken)
//   await AsyncStorage.setItem("expiration", `${moment().unix() + 60 * 60}`)

//   return idToken
//  }

// firebase.auth().createUserWithEmailAndPassword(email, password).then(newUser => {
//   firebase.database().ref('/users').child(newUser.uid).set({
//     name: name,
//     email: email
//   });
// })
