import { FC } from "react";
import { IPlanProps } from "../IPlan";
import "./Plan.scss";

const Plan: FC<IPlanProps> = (props) => {
  return (
    <div className={`tariff tariff_${props.planColor}`}>
      <div className={`tariff__background tariff__background_${props.planColor}`}>
        <h3 className="tariff__title">{props.title}</h3>
      </div>
      {props.children}
      <button className={`tariff__button tariff__button_${props.planColor}`} disabled>
        {props.buttonText}
      </button>
      <div
        className={`tariff__tape ${props.redTape ? "tariff__tape_red" : "tariff__tape_grey"}`}
      ></div>
      {/* <p className={`tariff__text ${props.redTape ? "tariff__text_yellow" : "tariff__text_cacao"}`}>
        {props.redTape ? "Временно без ограничений" : "В разработке"}
      </p> */}
    </div>
  );
};

export { Plan };
