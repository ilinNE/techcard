import { FC } from "react";
import { Link } from "react-router-dom";
import "./ErrorPage.scss";
import errorImage from "../../images/error-404.png"

const ErrorPage: FC = () => {
  return (
    <section className="error-page">
      <h1 className="error-page__header">404</h1>
      <img className="error-page__img" src={errorImage} alt="страница 404" />
      <p className="error-page__text">Что-то явно пошло не так...</p>
      <Link to="/" className="error-page__button">Вернуться</Link>
    </section>
  );
};

export  { ErrorPage };
