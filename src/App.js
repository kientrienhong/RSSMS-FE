import "./App.css";
import route from "./routing/route";
import { ThemeProvider } from "@material-ui/core";
import theme from "./theme";
import { messaging } from "./firebase/firebase";
import { useRoutes } from "react-router-dom";
function App() {
  const content = useRoutes(route);
  console.log(messaging);
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

  messaging.onMessage((payload) => {
    console.log("Message received. ", payload);
    // ...
  });

  return <ThemeProvider theme={theme}>{content}</ThemeProvider>;
}

export default App;
