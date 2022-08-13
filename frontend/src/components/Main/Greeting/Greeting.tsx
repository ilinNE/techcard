import { FC } from "react";
import { Link } from "react-router-dom";
import "./Greeting.scss";
import kitchen from "../../../images/first-page-image.png";

interface GreetingProps {
  greetingTitle: string;
  greetingSubtitle: string;
  buttonTitle: string;
}

const Greeting: FC<GreetingProps> = ({ greetingTitle, greetingSubtitle, buttonTitle }) => {
  return (
    <section className="greeting">
      <h1 className="greeting__title">{greetingTitle}</h1>
      <p className="greeting__subtitle">{greetingSubtitle}</p>
      <Link className="header__link" to="/signup">
        <button className="greeting__button">{buttonTitle}</button>
      </Link>
      <img className="greeting__image" src={kitchen} alt="Девушка на кухне" />
    </section>
  );
};

export default Greeting;
