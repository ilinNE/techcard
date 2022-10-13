import { FC } from "react";
import { NavLink } from "react-router-dom";
import "./Nav.scss";
import { header } from "../../../utils/textConstants";
import { INavProps } from "./INav";

const setActive = ({ isActive }: any) => `nav__link ${isActive && "nav__link_active"}`;

const Nav: FC<INavProps> = ({ handleCloseBurgerMenu, isBurgerOpen }) => {
  return (
    <section className={`nav ${isBurgerOpen && "nav_burger"}`}>
      {isBurgerOpen && (
        <NavLink onClick={handleCloseBurgerMenu} className={setActive} to="/profile">
          {header.Profile}
        </NavLink>
      )}

      <NavLink onClick={handleCloseBurgerMenu} className={setActive} to="/techcards">
        {header.MyTechCards}
      </NavLink>
      <NavLink onClick={handleCloseBurgerMenu} className={setActive} to="/guide">
        {header.Help}
      </NavLink>
    </section>
  );
};

export default Nav;
