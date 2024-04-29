import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBgcRMADwTL1j0MW7lw6MlzlvQ9WgPR4Tg",
  authDomain: "react-netflix-clone-8f8b7.firebaseapp.com",
  projectId: "react-netflix-clone-8f8b7",
  storageBucket: "react-netflix-clone-8f8b7.appspot.com",
  messagingSenderId: "30011873578",
  appId: "1:30011873578:web:baf2e757447fd2e3c4a653"
};

const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);