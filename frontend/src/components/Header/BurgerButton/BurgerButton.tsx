import { FC } from "react";
import "./BurgerButton.scss";

interface BurgerButtonProps {
  handleOpenBurgerMenu: () => void;
  handleCloseBurgerMenu: () => void;
  isBurgerOpen: boolean;
}

const BurgerButton: FC<BurgerButtonProps> = ({
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
