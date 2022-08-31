import Header from "./components/Header";
import GlobalStyles from './components/GlobalStyles';
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { useContext, useEffect, useState } from "react";
import Medical from "./components/Medical";

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
    </Router>
  );
}

export default App;
