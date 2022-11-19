import { FC } from "react";
import { IAddExtraIngredientPopup } from "./IAddExtraIngredientPopup";
import "./AddExtraIngredientPopup.scss"
import AddIngredientForm from "../../../UI/AddIngredientForm/AddIngredientForm";
import { Ingredient } from "../../../UI/Ingredient/Ingredient";

const AddExtraIngredientPopup: FC<IAddExtraIngredientPopup> = (props) => {
  return (
    <div className={`extra-ingredient-popup ${props.isExtraIngredientPopupOpen ? "extra-ingredient-popup_visible" : ""}`}>
        <AddIngredientForm minWidth={"670px"}/>
        <ul className="extra-ingredient-popup__list">
          <Ingredient />
        </ul>
        <button className="extra-ingredient-popup__add-button">Добавить</button>
        <button className="extra-ingredient-popup__close-button" onClick={props.closeExtraIngredientPopup}></button>
    </div>
  );
};

export default AddExtraIngredientPopup;
