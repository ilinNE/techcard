import React, { FC } from "react";
import "./Main.scss";
import * as Api from "../../utils/Api";

const Main: FC = () => {
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
      <h1>Главная страница</h1>
      <button className="button" onClick={handleGet}>
        Get
      </button>
      <button className="button" onClick={handlePost}>
        Post
      </button>
      <p className="light">Montserrat-Light</p>
      <p className="Medium">Montserrat-Medium</p>
      <p className="SemiBold">Montserrat-SemiBold</p>
      <br />
      <p className="light">Монсеррат-Светлый</p>
      <p className="Medium">Монсеррат-Средний</p>
      <p className="SemiBold">Монсеррат-Полужирный</p>
    </div>
  );
};

export default Main;
