import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "logininvishalmart.firebaseapp.com",
  projectId: "logininvishalmart",
  storageBucket: "logininvishalmart.firebasestorage.app",
  messagingSenderId: "278139611744",
  appId: "1:278139611744:web:33f7ad22b5b609b96cf105",
  measurementId: "G-T65PBMC3BE"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {auth,provider} 