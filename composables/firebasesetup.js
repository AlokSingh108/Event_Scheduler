import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB1XtdBm2C9rWYZAYnBlLmwgl4CGANHRJ0",
  authDomain: "meeting-scheduler-b5428.firebaseapp.com",
  projectId: "meeting-scheduler-b5428",
  storageBucket: "meeting-scheduler-b5428.appspot.com",
  messagingSenderId: "774628942681",
  appId: "1:774628942681:web:cd4a9eb5df92ac7538a248"
};

export function setupFirebase(){

    const app1 =initializeApp(firebaseConfig);
    const firestore = getFirestore(app1);
    return firestore;

}
// export default defineNuxtPlugin(async(nuxtApp) => {
//   const config = useRuntimeConfig();


//   const app =await initializeApp(firebaseConfig);
//   const firestore = getFirestore(app);

//   nuxtApp.vueApp.provide("firestore", firestore);
//   nuxtApp.provide("firestore", firestore);
//   // return firestore;
// });
