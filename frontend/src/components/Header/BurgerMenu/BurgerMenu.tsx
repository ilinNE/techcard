import { FC, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Avatar from "../../Avatar/Avatar";
import Nav from "../Nav/Nav";
import "./BurgerMenu.scss";

interface BurgerMenuProps {
  handleCloseBurgerMenu: () => void;
  isBurger: boolean;
}

const BurgerMenu: FC<BurgerMenuProps> = ({ handleCloseBurgerMenu, isBurger }) => {
  const { pathname } = useLocation();

  // useEffect(() => {
  //   handleCloseBurgerMenu();
  // }, [pathname]);

  return (
    <section className={`burgerMenu ${isBurger && "burgerMenu_opened"}`}>
      <button onClick={handleCloseBurgerMenu} className="burgerMenu__arrow" />
      <div className="burgerMenu__container">
        <Nav handleCloseBurgerMenu={handleCloseBurgerMenu} />
        <Avatar handleCloseBurgerMenu={handleCloseBurgerMenu} />
      </div>
    </section>
  );
};

export default BurgerMenu;
