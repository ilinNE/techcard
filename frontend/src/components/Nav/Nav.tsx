import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import "./Nav.scss";

interface NavProps {
  loggedIn: boolean;
}

const setActive = ({ isActive }: any) => `nav__link ${isActive && "nav__link_active"}`;

const Nav: FC<NavProps> = ({ loggedIn }) => {
  return (
    <div className="nav">
      {loggedIn ? (
        <>
          <NavLink className={setActive} to="/dishes">
            Мои техкарты
          </NavLink>
          <NavLink className={setActive} to="/guide">
            Помощь
          </NavLink>
        </>
      ) : (
        <>
          <a href="#test1" className="nav__link">
            О проекте
          </a>
          <a href="#test2" className="nav__link">
            Тарифы
          </a>
        </>
      )}
    </div>
  );
};

export default Nav;
