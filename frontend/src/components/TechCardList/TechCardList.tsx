import { FC } from "react";
import { TechCard } from "../TechCard/TechCard";
import { ITechCardList } from "./ITechCardList";
import "./TechCardList.scss";

const TechCardList: FC<ITechCardList> = (props) => {  
    return (      
        <ul className="techcard-list">
          <TechCard isListStyle={props.isListStyle} />
          <TechCard  isListStyle={props.isListStyle} />
        </ul>
    );
  };
  
  export default TechCardList;