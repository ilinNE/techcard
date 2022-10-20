import { FC, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Foodstuff from "../Foodstuff/Foodstuff";
// import { TechCard } from "../TechCard/TechCard";
import TechCardList from "../TechCardList/TechCardList";
import { ITechCardsProps } from "./ITechCardsProps";
import { getTechcards } from "../../utils/Api/Api";
import { TechcardParams } from "../../utils/Api/ApiTypes";
import { EmptyContent } from "../EmptyContent/EmptyContent";
import "./TechCards.scss";

const TechCards: FC<ITechCardsProps> = (props) => {
  const [isListStyle, setIsListStyle] = useState<boolean>(false);
  const [techcards, setTechcards] = useState<TechcardParams[]>([]);
  useEffect(() => {
    getTechcards().then((data) => {
      setTechcards(data);
    });
  }, []);
  const location = useLocation();

  return (
    <section className={`techcards ${props.isOpenSideMenu && "techcards_full"}`}>
      <div className="techcards__centring">
        <div className="techcards__menu">
          <div className="techcards__box">
            <h1 className="techcards__name">{props.title}</h1>
            <button className="techcards__add-card"></button>
          </div>
          <div className="techcards__upside">
            <ul
              className={`techcards__viewlist ${
                location.pathname === "/techcards/foodstuff" ? "techcards__viewlist_invisible" : ""
              }`}
            >
              <li className="techcards__viewlist-item">
                <button
                  onClick={() => setIsListStyle(!isListStyle)}
                  className={`techcards__viewlist-btn techcards__viewlist-btn_grid ${
                    isListStyle ? "" : "techcards__viewlist-btn_active"
                  }`}
                ></button>
              </li>
              <li className="techcards__viewlist-item">
                <button
                  onClick={() => setIsListStyle(!isListStyle)}
                  className={`techcards__viewlist-btn techcards__viewlist-btn_list ${
                    isListStyle ? "techcards__viewlist-btn_active" : ""
                  }`}
                ></button>
              </li>
            </ul>
            <form action="" className="techcards__form">
              <label htmlFor="sort" className="techcards__label">
                Сортировать
              </label>
              <select name="sort" id="sort" className="techcards__select">
                <option className="techcards__option">По алфавиту А-Я</option>
                <option className="techcards__option">По алфавиту Я-А</option>
                <option className="techcards__option">Сначала новые</option>
                <option className="techcards__option">Сначала старые</option>
              </select>
            </form>
          </div>
          <div className="techcards__scrollbar">
            <ul className="techcards__taglist">
              <li className="techcards__tag">
                <button className="techcards__tag-btn">Вторые блюда</button>
              </li>
              <li className="techcards__tag">
                <button className="techcards__tag-btn">Вторые блюда</button>
              </li>
              <li className="techcards__tag">
                <button className="techcards__tag-btn">Вторые блюда</button>
              </li>
              <li className="techcards__tag">
                <button className="techcards__tag-btn">Вторые блюда</button>
              </li>
              <li className="techcards__tag">
                <button className="techcards__tag-btn">Вторые блюда</button>
              </li>
              <li className="techcards__tag">
                <button className="techcards__tag-btn">Вторые блюда</button>
              </li>
              <li className="techcards__tag">
                <button className="techcards__tag-btn">Вторые блюда</button>
              </li>
            </ul>
          </div>
        </div>
        {location.pathname === "/techcards/foodstuff" ? (
          <Foodstuff />
        ) : techcards.length !== 0 ? (
          <TechCardList techcards={techcards} isListStyle={isListStyle} />
        ) : (
          <EmptyContent />
        )}
        <button className="techcards__usual-btn">Еще</button>
      </div>
    </section>
  );
};

export default TechCards;
