import { FC, useState, useEffect } from "react";
import { TechCard } from "../TechCard/TechCard";
import { ITechCardList } from "./ITechCardList";
import { getTechcards } from "../../utils/Api/Api";
import { TechcardParams } from "../../utils/Api/ApiTypes";
import "./TechCardList.scss";

const TechCardList: FC<ITechCardList> = (props) => {
  const [techcards, setTechcards] = useState<TechcardParams[]>([]);
  useEffect(() => {
    getTechcards().then((data) => {
      setTechcards(data);
    });
  }, []);

  return (
    <ul className="techcard-list">
      {techcards.map((techcard) => (
        <TechCard
          key={techcard.id}
          isListStyle={props.isListStyle}
          name={techcard.name}
          tags={techcard.tags}
        />
      ))}
    </ul>
  );
};

export default TechCardList;
