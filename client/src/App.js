import HeaderMenu from "./components/HeaderMenu";
import FooterLinks from "./components/FooterLinks";
import AppRouter from "./components/AppRouter";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <HeaderMenu/>
        <AppRouter />
        <FooterLinks/>
      </BrowserRouter>
    </>
  );
}

export default App;
