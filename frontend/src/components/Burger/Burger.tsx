import React, { FC } from "react";
import "./Burger.scss";
import burger from "../../images/burger.svg";

// interface OpenBurgerProps {
//   openBurger: boolean;
// }

const Burger: FC = () => {
  return <img className="burger link-opacity" src={burger} alt="Бургер меню" />;
};

export default Burger;
