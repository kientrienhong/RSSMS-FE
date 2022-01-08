importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("../firebase-messaging-sw.js")
    .then(function (registration) {
      console.log("Registration successful, scope is:", registration.scope);
    })
    .catch(function (err) {
      console.log("Service worker registration failed, error:", err);
    });
}

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

const messaging = firebase.messaging();
messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/logo192.png",
  };
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});

// const messaging = firebase.messaging();

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
