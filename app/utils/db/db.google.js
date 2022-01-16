import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  signInWithPopup,
  FacebookAuthProvider,
  getRedirectResult,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDaxy8idrHkUKDfwdD0eVOOm-vce3o9sSI",
  authDomain: "auth-dev-360bf.firebaseapp.com",
  projectId: "auth-dev-360bf",
  storageBucket: "auth-dev-360bf.appspot.com",
  messagingSenderId: "1046160653650",
  appId: "1:1046160653650:web:315ac4162180efce87ce8b",
  measurementId: "G-WK3TD49L5E",
};
let app;
app = initializeApp(firebaseConfig);
const auth = getAuth();

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
}

export async function signInWithGoogleRedirect() {
  const provider = new GoogleAuthProvider();
  return signInWithRedirect(auth, provider);
}

export async function signInWithFb() {
  const provider = new FacebookAuthProvider();
  return signInWithPopup(auth, provider);
}
export async function signInWithFbRed() {
  const provider = new FacebookAuthProvider();
  return signInWithRedirect(auth, provider);
}
export async function getRedRes() {
  return getRedirectResult(auth);
}

export async function getUser(result) {
  const credential = GoogleAuthProvider.credentialFromResult(result);
  const token = credential.accessToken;
  // The signed-in user info.
  const user = result.user;
  return user;
}

export async function getClientsideUser() {
  return auth.currentUser;
}

export const firebaseApp = app;
