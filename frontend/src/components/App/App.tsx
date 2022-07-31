import { useState } from "react";
import "./App.scss";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
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
import { pathWithHeader } from "../../utils/constants";

function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const { pathname } = useLocation();

  return (
    <section className="App">
      {pathWithHeader.includes(pathname) && <Header loggedIn={loggedIn} />}

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/dishes" element={<Dishes />} />
        <Route path="/semis" element={<Semis />} />
        <Route path="/foodstuff" element={<Foodstuff />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/profile" element={<Profile setLoggedIn={setLoggedIn} />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="*" element={<Navigate to="/error" replace />} />
      </Routes>
    </section>
  );
}

export default App;
