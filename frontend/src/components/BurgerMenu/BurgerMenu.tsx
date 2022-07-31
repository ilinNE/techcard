import { FC, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Avatar from "../Avatar/Avatar";
import Nav from "../Nav/Nav";
import "./BurgerMenu.scss";

interface BurgerMenuProps {
  handleCloseBurgerMenu: () => void;
  isBurger: boolean;
  authNavMyTechCards: string;
  authNavHelp: string;
}

const setActive = ({ isActive }: any) => `burgerMenu__link ${isActive && "burgerMenu__link_active"}`;

const BurgerMenu: FC<BurgerMenuProps> = ({ handleCloseBurgerMenu, isBurger, authNavMyTechCards, authNavHelp }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    handleCloseBurgerMenu();
  }, [pathname]);

  return (
    <section className={`burgerMenu ${isBurger && "burgerMenu_opened"}`}>
      <button className="burgerMenu__arrow" onClick={handleCloseBurgerMenu} />
      <div className="burgerMenu__container">
        <div className="burgerMenu__links">
          <NavLink className={setActive} to="/dishes">
            {authNavMyTechCards}
          </NavLink>
          <NavLink className={setActive} to="/guide">
            {authNavHelp}
          </NavLink>
        </div>
        <Avatar />
      </div>
    </section>
  );
};

export default BurgerMenu;
