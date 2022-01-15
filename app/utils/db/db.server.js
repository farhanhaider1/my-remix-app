import admin from "firebase-admin";
import {
  applicationDefault,
  initializeApp as initializeAdminApp,
} from "firebase-admin/app";
import { initializeApp, getApp, getApps } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  signOut,
} from "firebase/auth";
require("dotenv").config();
require("firebase/auth");

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDaxy8idrHkUKDfwdD0eVOOm-vce3o9sSI",
  authDomain: "auth-dev-360bf.firebaseapp.com",
  projectId: "auth-dev-360bf",
  storageBucket: "auth-dev-360bf.appspot.com",
  messagingSenderId: "1046160653650",
  appId: "1:1046160653650:web:315ac4162180efce87ce8b",
  measurementId: "G-WK3TD49L5E",
};

if (!admin.apps.length) {
  initializeAdminApp({
    credential: applicationDefault(),
  });
}
const db = admin.firestore();
const adminAuth = admin.auth();

let app;
if (getApps().length === 0) {
  // Initialize Firebase app
  app = initializeApp(firebaseConfig);
} else {
  // Use existing app if already initialized
  app = getApp();
}

const auth = getAuth();

export async function signIn(email, password) {
  // const auth = getAuth();
  return signInWithEmailAndPassword(auth, email, password);
}

export async function signUp(email, password) {
  // const auth = getAuth();
  return createUserWithEmailAndPassword(auth, email, password);
}
export async function signOutFirebase() {
  await signOut(getAuth());
}

async function getSessionToken(idToken) {
  const decodedToken = await adminAuth.verifyIdToken(idToken);
  if (new Date().getTime() / 1000 - decodedToken.auth_time > 5 * 60) {
    throw new Error("Recent sign in required");
  }
  const twoWeeks = 60 * 60 * 24 * 14 * 1000;
  return adminAuth.createSessionCookie(idToken, { expiresIn: twoWeeks });
}

export { db, getSessionToken, adminAuth };
