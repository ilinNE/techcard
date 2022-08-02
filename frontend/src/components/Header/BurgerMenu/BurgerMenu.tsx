import { FC, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Avatar from "../../Avatar/Avatar";
import Nav from "../Nav/Nav";
import "./BurgerMenu.scss";

interface BurgerMenuProps {
  handleCloseBurgerMenu: () => void;
  isBurgerOpen: boolean;
}

const BurgerMenu: FC<BurgerMenuProps> = ({ handleCloseBurgerMenu, isBurgerOpen }) => {
  return (
    <section className={`burgerMenu ${isBurgerOpen && "burgerMenu_opened"}`}>
      {/* <button onClick={handleCloseBurgerMenu} className="burgerMenu__arrow" /> */}
      <div className="burgerMenu__container">
        <Avatar handleCloseBurgerMenu={handleCloseBurgerMenu} isBurgerOpen={isBurgerOpen} />
        <Nav handleCloseBurgerMenu={handleCloseBurgerMenu} isBurgerOpen={isBurgerOpen} />
      </div>
    </section>
  );
};

export default BurgerMenu;
