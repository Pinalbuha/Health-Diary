import Header from "./components/Header";
import GlobalStyles from './components/GlobalStyles';
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./components/Profile";
import Medical from "./components/Medical";
import Footer from "./components/Footer";

const App = () => {
  return (
    <Router>
      <GlobalStyles />
        <Header />
          <Routes>
            <Route exact={true} path="/"  element={<Home />} />
            <Route exact={true} path="/profile"  element={<Profile />} />
            <Route exact={true} path="/medical"  element={<Medical />} />
          </Routes>
          <Footer />
    </Router>
  );
}

export default App;
