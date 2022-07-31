import { FC } from "react";
import { Link } from "react-router-dom";
import "./Greeting.scss";
import kitchen from "../../../images/kitchen.png";

const Greeting: FC = () => {
  return (
    <section className="greeting">
      <h1 className="greeting__title">Организуй свои рецепты</h1>
      <p className="greeting__subtitle">
        ТехКарта&nbsp;&mdash; это простой способ создавать, хранить, изменять технические карты для своих блюд.
      </p>
      <Link className="header__link" to="/signup">
        <button className="greeting__button">Начать бесплатно</button>
      </Link>
      <img className="greeting__image" src={kitchen} alt="Девушка на кухне" />
    </section>
  );
};

export default Greeting;
