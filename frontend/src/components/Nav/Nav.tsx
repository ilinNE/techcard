import { FC } from "react";
import { NavLink } from "react-router-dom";
import "./Nav.scss";

interface NavProps {
  loggedIn: boolean;
  mainNavAboute: string;
  mainNavTariffs: string;
  authNavMyTechCards: string;
  authNavHelp: string;
}

const setActive = ({ isActive }: any) => `nav__link ${isActive && "nav__link_active"}`;

const Nav: FC<NavProps> = ({ loggedIn, mainNavAboute, mainNavTariffs, authNavMyTechCards, authNavHelp }) => {
  return (
    <section className="nav">
      {loggedIn ? (
        <>
          <NavLink className={setActive} to="/dishes">
            {authNavMyTechCards}
          </NavLink>
          <NavLink className={setActive} to="/guide">
            {authNavHelp}
          </NavLink>
        </>
      ) : (
        <>
          <a href="#test1" className="nav__link">
            {mainNavAboute}
          </a>
          <a href="#test2" className="nav__link">
            {mainNavTariffs}
          </a>
        </>
      )}
    </section>
  );
};

export default Nav;
