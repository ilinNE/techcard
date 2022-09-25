import { FC } from "react";
import { Plan } from "./Plan/Plan";
import { header } from "../../../utils/textConstants";
import "./Planslist.scss";

const Planslist: FC = () => {
  return (
    <section className="tariffs" id="tariffs">
      <div className="tariffs__wave tariffs__wave_green"></div>
      <h2 className="tariffs__title">{header.Tariffs}</h2>
      <ul className="tariffs__list">
        <li className="tariffs__list-item">
          <Plan planColor={"blue"} buttonText={"Выбран"} title={"Базовый"} redTape={true}>
            <ul className="tariffs__child-list">
              <li className="tariffs__offer"><span className="tariffs__offer_bold">10</span> блюд</li>
              <li className="tariffs__offer"><span className="tariffs__offer_bold">10</span> полуфабрикатов</li>
              <li className="tariffs__offer"><span className="tariffs__offer_bold">100</span> продуктов</li>
            </ul>
          </Plan>
        </li>
        <li className="tariffs__list-item">
          <Plan planColor={"green"} buttonText={"Недоступно"} title={"Оптимальный"} redTape={false}>
          <ul className="tariffs__child-list">
              <li className="tariffs__offer"><span className="tariffs__offer_bold">30</span> блюд</li>
              <li className="tariffs__offer"><span className="tariffs__offer_bold">30</span> полуфабрикатов</li>
              <li className="tariffs__offer"><span className="tariffs__offer_bold">1000</span> продуктов</li>
            </ul>
          </Plan>
        </li>
        <li className="tariffs__list-item">
          <Plan planColor={"yellow"} buttonText={"Недоступно"} title={"ПРО"} redTape={false}>
          <p className="tariffs__offer_unlimited">Никаких ограничений</p>
          </Plan>
        </li>
      </ul>
      <div className="tariffs__wave tariffs__wave_blue"></div>
    </section>
  );
};

export { Planslist };
