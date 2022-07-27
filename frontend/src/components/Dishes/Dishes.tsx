import React, { FC } from "react";
import Header from "../Header/Header";
import "./Dishes.scss";

interface DishesProps {
  loggedIn: boolean;
}

const Dishes: FC<DishesProps> = ({ loggedIn }) => {
  return (
    <div>
      <Header loggedIn={loggedIn} />
      <h1>Блюда</h1>
    </div>
  );
};

export default Dishes;
