import { FC } from "react";
import { NavLink } from "react-router-dom";
import "./Nav.scss";
import { header } from "../../../utils/textСonstants";

const setActive = ({ isActive }: any) => `nav__link ${isActive && "nav__link_active"}`;

interface NavProps {
  handleCloseBurgerMenu?: () => void;
}

const Nav: FC<NavProps> = ({ handleCloseBurgerMenu }) => {
  return (
    <section className="nav">
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
