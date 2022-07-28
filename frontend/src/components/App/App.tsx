import React, { useState } from "react";
import "./App.scss";
import { Route, Routes } from "react-router-dom";
import Dishes from "../Dishes/Dishes";
import Main from "../Main/Main";
import Semis from "../Semis/Semis";
import Foodstuff from "../Foodstuff/Foodstuff";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Guide from "../Guide/Guide";
import ErrorPage from "../ErrorPage/ErrorPage";
import Header from "../Header/Header";

function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  return (
    <section className="App">
      <Header loggedIn={loggedIn} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/disches" element={<Dishes />} />
        <Route path="/semis" element={<Semis />} />
        <Route path="/foodstuff" element={<Foodstuff />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login setLoggedIn={setLoggedIn} />} />
        <Route path="/profile" element={<Profile setLoggedIn={setLoggedIn} />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </section>
  );
}

export default App;
