import {
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updatePassword,
} from "firebase/auth";
import { auth, provider } from "~/configs";

export async function signup(email, password) {
  try {
    return await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error;
  }
}

export async function login(email, password, isChecked = false) {
  try {
    setPersistence(
      auth,
      isChecked ? browserLocalPersistence : browserSessionPersistence
    );
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error;
  }
}

export async function loginWithGoogle() {
  try {
    return signInWithPopup(auth, provider);
  } catch (error) {
    throw error;
  }
}

export function checkLogin(handle) {
  return new Promise(function (resolve, reject) {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        resolve(user);
        handle(true);
      } else {
        reject(Error("It broke"));
        handle(false);
      }
    });
  });
}

export function logout() {
  return signOut(auth);
}

export async function resetPassword(email) {
  return await sendPasswordResetEmail(auth, email);
}

export function updatePasswordByUser(password) {
  return updatePassword(auth.currentUser, password);
}

// export function updateEmail(email) {
//   return currentUser.updateEmail(email);
// }
