import React from "react";
import "./App.scss";

import { NavLink, Route, Routes } from "react-router-dom";
import Dishes from "../Dishes/Dishes";
import Main from "../Main/Main";
import Semis from "../Semis/Semis";
import Foodstuff from "../Foodstuff/Foodstuff";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Guide from "../Guide/Guide";
import ErrorPage from "../ErrorPage/ErrorPage";

function App() {
  return (
    <section className="App">
      <div className="nav">
        <NavLink className="navLink" to="/disches">
          Блюда
        </NavLink>
        <NavLink className="navLink" to="/semis">
          Полуфабрикаты
        </NavLink>
        <NavLink className="navLink" to="/foodstuff">
          Продукты
        </NavLink>
        <NavLink className="navLink" to="/signup">
          Регистрация
        </NavLink>
        <NavLink className="navLink" to="/signin">
          Авторизация
        </NavLink>
        <NavLink className="navLink" to="/profile">
          Профайл
        </NavLink>
        <NavLink className="navLink" to="/guide">
          Помощь
        </NavLink>
        <NavLink className="navLink" to="*">
          404
        </NavLink>
      </div>

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/disches" element={<Dishes />} />
        <Route path="/semis" element={<Semis />} />
        <Route path="/foodstuff" element={<Foodstuff />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </section>
  );
}

export default App;
