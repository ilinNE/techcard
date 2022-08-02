import { FC } from "react";
import { NavLink } from "react-router-dom";
import "./Nav.scss";
import { header } from "../../../utils/textСonstants";

const setActive = ({ isActive }: any) => `nav__link ${isActive && "nav__link_active"}`;

interface NavProps {
  handleCloseBurgerMenu?: () => void;
  isBurgerOpen?: boolean;
}

const Nav: FC<NavProps> = ({ handleCloseBurgerMenu, isBurgerOpen }) => {
  return (
    <section className={`nav ${isBurgerOpen && "nav_burger"}`}>
      {isBurgerOpen && (
        <NavLink onClick={handleCloseBurgerMenu} className={setActive} to="/profile">
          {header.Profile}
        </NavLink>
      )}

      <NavLink onClick={handleCloseBurgerMenu} className={setActive} to="/dishes">
        {header.MyTechCards}
      </NavLink>
      <NavLink onClick={handleCloseBurgerMenu} className={setActive} to="/guide">
        {header.Help}
      </NavLink>
    </section>
  );
};

export default Nav;
