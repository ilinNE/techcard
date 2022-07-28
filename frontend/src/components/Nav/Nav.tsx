import React, { FC } from "react";
import { Link } from "react-router-dom";
import "./Nav.scss";

interface NavProps {
  loggedIn: boolean;
}

const Nav: FC<NavProps> = ({ loggedIn }) => {
  return (
    <div className="nav">
      {loggedIn ? (
        <>
          <Link className="nav__link link-opacity" to="/disches">
            Мои техкарты
          </Link>
          <Link className="nav__link link-opacity" to="/guide">
            Помощь
          </Link>
        </>
      ) : (
        <>
          <a href="#test1" className="nav__link link-opacity">
            О проекте
          </a>
          <a href="#test2" className="nav__link link-opacity">
            Тарифы
          </a>
        </>
      )}
    </div>
  );
};

export default Nav;
