import "./App.css";
import route from "./routing/route";
import { ThemeProvider } from "@material-ui/core";
import theme from "./theme";
import { useRoutes } from "react-router-dom";

function App() {
  const content = useRoutes(route);
  console.log(content);
  return <ThemeProvider theme={theme}>{content}</ThemeProvider>;
}

export default App;
