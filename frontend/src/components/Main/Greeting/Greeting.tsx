import { FC } from "react";
import "./Greeting.scss";
import kitchen from "../../../images/kitchen.png";


const Greeting: FC = () => {
  return <>
    <h1>Организуй свои рецепты</h1>
    <p>ТехКарта – это простой способ создавать, хранить, изменять технические карты
      для своих блюд.</p>
    <button>Начать бесплатно</button>
    <img className="kitchen" src={kitchen} alt="Девушка на кухне" />
  </>;
};

export default Greeting;

