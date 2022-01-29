import firebase from "firebase/app";
import "firebase/storage";
import "@firebase/messaging";

var firebaseConfig = {
  apiKey: "AIzaSyCbxMnxwCfJgCJtvaBeRdvvZ3y1Ucuyv2s",
  authDomain: "rssms-5fcc8.firebaseapp.com",
  projectId: "rssms-5fcc8",
  storageBucket: "rssms-5fcc8.appspot.com",
  messagingSenderId: "752405040481",
  appId: "1:752405040481:web:c11a764577b3b05c864920",
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

const storageFirebase = firebase.storage();

const messaging = firebase.messaging();
messaging
  .getToken({
    vapidKey:
      "BBQSudrbpGiOyWsK-B11q3AJRx8VUGnYzxFzDraRz9G6P4ddz4oAEr1poiNVN_3IxCBb-83k6D89AHeoWUTrNHo",
  })
  .then((currentToken) => {
    if (currentToken) {
      console.log(currentToken);
      localStorage.setItem("tokenFirebase", currentToken);
    } else {
      console.log(
        "No registration token available. Request permission to generate one."
      );
    }
  })
  .catch((err) => {
    console.log("An error occurred while retrieving token. ", err);
  });

// messaging.onBackgroundMessage((payload) => {
//   console.log(
//     "[firebase-messaging-sw.js] Received background message ",
//     payload
//   );
//   // Customize notification here
//   const notificationTitle = "Background Message Title";
//   const notificationOptions = {
//     body: "Background Message body.",
//     icon: "/firebase-logo.png",
//   };

//   window.self.registration.showNotification(
//     notificationTitle,
//     notificationOptions
//   );
// });

export { storageFirebase, messaging, firebase as default };
