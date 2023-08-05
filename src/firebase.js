import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
//import firebase from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyBDQN76ga08rbUCn8nrxSbvNz9rEywy5bM",
  authDomain: "healthplanningapp.firebaseapp.com",
  databaseURL: "https://healthplanningapp-default-rtdb.firebaseio.com",
  projectId: "healthplanningapp",
  storageBucket: "healthplanningapp.appspot.com",
  messagingSenderId: "105820559940",
  appId: "1:105820559940:web:82f18531b13660f06cfa11",
  measurementId: "G-6C4GH9PKM4"
};


export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
export const firestore = getFirestore(app);

export const createUserDocument = async (user, additionalData) => {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);

  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email } = user;
    const { displayName } = additionalData;

    try {
      await userRef.set({
        displayName,
        email,
        createdAt: new Date(),
      });
    } catch (error) {
      console.log('Error in creating user', error);
    }
  }
};
