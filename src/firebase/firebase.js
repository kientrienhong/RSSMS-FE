import firebase from "firebase/app";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyCbxMnxwCfJgCJtvaBeRdvvZ3y1Ucuyv2s",
  authDomain: "rssms-5fcc8.firebaseapp.com",
  projectId: "rssms-5fcc8",
  storageBucket: "rssms-5fcc8.appspot.com",
  messagingSenderId: "752405040481",
  appId: "1:752405040481:web:c11a764577b3b05c864920",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storageFirebase = firebase.storage();
export { storageFirebase, firebase as default };
