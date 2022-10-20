import { FC } from "react";
import { TechCard } from "../TechCard/TechCard";
import { ITechCardList } from "./ITechCardList";
import "./TechCardList.scss";

const TechCardList: FC<ITechCardList> = (props) => {
  return (
    <ul className="techcard-list">
      {props.techcards.map((techcard) => (
        <TechCard key={techcard.id} isListStyle={props.isListStyle} techcard={techcard} />
      ))}
    </ul>
  );
};

export default TechCardList;
