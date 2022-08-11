import { FC } from "react";
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
      <div className={`burgerMenu__menu  ${isBurgerOpen && "burgerMenu__menu_opened"}`}>
        <div className="burgerMenu__container">
          <Avatar handleCloseBurgerMenu={handleCloseBurgerMenu} isBurgerOpen={isBurgerOpen} />
          <Nav handleCloseBurgerMenu={handleCloseBurgerMenu} isBurgerOpen={isBurgerOpen} />
        </div>
      </div>
    </section>
  );
};

export default BurgerMenu;
