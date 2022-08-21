import { FC } from "react";
import "./BurgerButton.scss";
import { IBurgerButtonProps } from "./IBurgerButton";

const BurgerButton: FC<IBurgerButtonProps> = ({
  handleOpenBurgerMenu,
  handleCloseBurgerMenu,
  isBurgerOpen,
}) => {
  return (
    <div
      onClick={isBurgerOpen ? handleCloseBurgerMenu : handleOpenBurgerMenu}
      className={`burgerButton ${isBurgerOpen && "burgerButton_open"}`}
    >
      <div className="burgerButton__line "></div>
    </div>
  );
};

export default BurgerButton;
