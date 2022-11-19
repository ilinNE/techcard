import { FC, useState } from "react";
import { INewCardPopup } from "./INewCardPopup";
import IngredientsTable from "./IngredientsTable/IngredientsTable";
import AddExtraIngredientPopup from "./IngredientsTable/AddExtraIngredientPopup/AddExtraIngredientPopup";

import "./NewCardPopup.scss";

const NewCardPopup: FC<INewCardPopup> = (props) => {
  const [isTechProcessOpen, setIsTechProcessOpen] = useState(false);
  const [isAddTypePopupOpen, setIsAddTypePopupOpen] = useState(false);
  const [isExtraIngredientPopupOpen, setIsExtraIngredientPopupOpen] = useState(false);
  const [typesList, setTypesList] = useState([]);

  const toggleTechProcess = (evt: any) => {
    evt.preventDefault();
    setIsTechProcessOpen(!isTechProcessOpen);
  };

  const toggleAddTypePopup = (evt: any) => {
    evt.preventDefault();
    setIsAddTypePopupOpen(!isAddTypePopupOpen);
  };

  const closeMainPopup = (evt: any) => {
    evt.preventDefault();
    setIsTechProcessOpen(false);
    props.setIsNewCardPopupOpen(false);
  };

  const openExtraIngredientPopup = (evt: any) => {
    evt.preventDefault();
    setIsExtraIngredientPopupOpen(true);
  };

  const closeExtraIngredientPopup = (evt: any) => {
    evt.preventDefault();
    setIsExtraIngredientPopupOpen(false);
  };

  const addType = (evt: any) => {
    evt.preventDefault();
  };

  return (
    <div className={`new-card-popup ${props.isNewCardPopupOpen ? "new-card-popup_open" : ""}`}>
      <div className="new-card-popup__container">
        <form className="new-card-popup__form">
          <div className="new-card-popup__header">
            <div className="new-card-popup__header-interlayer">
              <button className="new-card-popup__save-button">Сохранить</button>
              <div className="new-card-popup__input-field">
                <div className="new-card-popup__text-input-box">
                  <input
                    className="new-card-popup__input-text new-card-popup__input-text_title"
                    type="text"
                    name=""
                    id=""
                    placeholder="Наименование"
                  />
                  <div className="new-card-popup__add-type-block">
                    {typesList.length !== 0 ? (
                      <p className="new-card-popup__text">Добавить тип блюда</p>
                    ) : (
                      <ul className="new-card-popup__tag-list">
                        {/* {typesList.map((type) => ( */}
                          <li className="new-card-popup__tag" style={{ borderColor: "red" }}>
                            <p className="new-card-popup__tag-text" style={{ color: "red" }}>Soup</p>
                            <button className="new-card-popup__tag-btn"></button>
                          </li>
                          <li className="new-card-popup__tag" style={{ borderColor: "red" }}>
                            <p className="new-card-popup__tag-text" style={{ color: "red" }}>Soup</p>
                            <button className="new-card-popup__tag-btn"></button>
                          </li>
                          <li className="new-card-popup__tag" style={{ borderColor: "red" }}>
                            <p className="new-card-popup__tag-text" style={{ color: "red" }}>Soup</p>
                            <button className="new-card-popup__tag-btn"></button>
                          </li>
                        {/* ))} */}
                      </ul>
                    )}
                    <button
                      onClick={toggleAddTypePopup}
                      className={`new-card-popup__add-plus-btn new-card-popup__add-plus-btn_type ${
                        isAddTypePopupOpen ? "rotate" : ""
                      }`}
                    ></button>
                  </div>
                </div>
              </div>
              <button className="new-card-popup__close-button" onClick={closeMainPopup}></button>
            </div>
          </div>
          <div className="new-card-popup__main-field">
            <div
              className={`new-card-popup__manual ${
                isTechProcessOpen ? "" : "new-card-popup__manual_close"
              }`}
            >
              <button
                className={`new-card-popup__arrow ${
                  isTechProcessOpen ? "" : "new-card-popup__arrow_close"
                }`}
                onClick={toggleTechProcess}
              ></button>
              <div className="new-card-popup__textarea-field">
                <p
                  className={`new-card-popup__textarea-title ${
                    isTechProcessOpen ? "" : "new-card-popup__textarea-title_rotate"
                  }`}
                >
                  Технологический процесс
                </p>
                <textarea
                  className={`new-card-popup__textarea ${
                    isTechProcessOpen ? "" : "new-card-popup__textarea_hidden"
                  }`}
                  name=""
                  id=""
                  cols={50}
                  rows={10}
                  placeholder="Когда добавлять соль?"
                ></textarea>
              </div>
            </div>
            <div
              className={`new-card-popup__add-type-popup ${
                isAddTypePopupOpen ? "new-card-popup__add-type-popup_open" : ""
              }`}
            >
              <div className="new-card-popup__input-box">
                <input
                  className="new-card-popup__input-text new-card-popup__input-text_type"
                  type="search"
                  name=""
                  id=""
                  placeholder="Тип блюда"
                />
                <input
                  className="new-card-popup__input-color"
                  type="color"
                  name=""
                  id=""
                  defaultValue={"#EEE617"}
                />
              </div>
              <button className="new-card-popup__save-button" onClick={addType}>
                Добавить
              </button>
            </div>
            <div className="new-card-popup__ingredient-field">
              <div className="new-card-popup__ingredient-table-field">
                <button
                  className="new-card-popup__add-plus-btn new-card-popup__add-plus-btn_ingredient"
                  onClick={openExtraIngredientPopup}
                ></button>
                <IngredientsTable />
              </div>
            </div>
          </div>
        </form>
        <AddExtraIngredientPopup
          isExtraIngredientPopupOpen={isExtraIngredientPopupOpen}
          closeExtraIngredientPopup={closeExtraIngredientPopup}
        />
      </div>
    </div>
  );
};

export default NewCardPopup;
