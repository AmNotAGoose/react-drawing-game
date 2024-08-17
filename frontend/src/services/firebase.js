import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';




const firebaseConfig = {
  apiKey: "AIzaSyAG1j2lWU00naO-AZS9odE0-0sRG_1Fw_8",
  authDomain: "react-drawing-679de.firebaseapp.com",
  projectId: "react-drawing-679de",
  storageBucket: "react-drawing-679de.appspot.com",
  messagingSenderId: "277792806383",
  appId: "1:277792806383:web:7122940e2a7102289bd21a"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
