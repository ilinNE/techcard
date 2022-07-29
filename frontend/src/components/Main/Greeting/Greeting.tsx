import { FC } from "react";
import "./Greeting.scss";
import kitchen from "../../../images/kitchen.png";


const Greeting: FC = () => {
  return <div className="greeting">
    <h1 className="greeting__header">Организуй свои рецепты</h1>
    <p className="greeting__text">ТехКарта – это простой способ создавать, хранить, изменять технические карты
      для своих блюд.</p>
    <button className="greeting__button">Начать бесплатно</button>
    <img className="greeting__image" src={kitchen} alt="Девушка на кухне" />
  </div>;
};

export default Greeting;

