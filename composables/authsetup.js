import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB1XtdBm2C9rWYZAYnBlLmwgl4CGANHRJ0",
  authDomain: "meeting-scheduler-b5428.firebaseapp.com",
  projectId: "meeting-scheduler-b5428",
  storageBucket: "meeting-scheduler-b5428.appspot.com",
  messagingSenderId: "774628942681",
  appId: "1:774628942681:web:cd4a9eb5df92ac7538a248"
};


export function setupAuth(){

    const app =initializeApp(firebaseConfig);
    const auth = getAuth(app);
    return auth;

}

