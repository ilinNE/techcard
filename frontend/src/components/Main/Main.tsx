import React, { FC } from "react";
import "./Main.scss";
import * as Api from "../../utils/Api";
import Header from "../Header/Header";

interface MainProps {
  loggedIn: boolean;
}

const Main: FC<MainProps> = ({ loggedIn }) => {
  function handleGet() {
    Api.getTest()
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handlePost() {
    Api.postTest("Тестовая строка")
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <Header loggedIn={loggedIn} />
      <h1>Главная страница</h1>
      <button className="button" onClick={handleGet}>
        Get
      </button>
      <button className="button" onClick={handlePost}>
        Post
      </button>
      <p id="test1" className="light">
        Montserrat-Light
      </p>
      <p className="Medium">Montserrat-Medium</p>
      <p className="SemiBold">Montserrat-SemiBold</p>
      <br />
      <p id="test2" className="light">
        Монсеррат-Светлый
      </p>
      <p className="Medium">Монсеррат-Средний</p>
      <p className="SemiBold">Монсеррат-Полужирный</p>
    </div>
  );
};

export default Main;
