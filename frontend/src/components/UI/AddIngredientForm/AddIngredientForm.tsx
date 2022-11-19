import { FC } from "react";
import "./AddIngredientForm.scss"
import { IAddIngredientForm } from "./IAddIngredientForm";


const AddIngredientForm: FC<IAddIngredientForm> = (props) => {
  return (
    <form action="" className="ingredient-form" style={{ minWidth: props.minWidth }}>
      <div className="ingredient-form__input-box">
        <label htmlFor="name" className="ingredient-form__label">
          Наименование
        </label>
        <input type="text" name="name" className="ingredient-form__input-text" autoComplete="off" />
      </div>
      <div className="ingredient-form__input-box">
        <label htmlFor="type" className="ingredient-form__label">
          Тип продукта
        </label>
        <input type="search" name="type" className="ingredient-form__input-text" />
      </div>
      <div className="ingredient-form__input-box">
        <label htmlFor="color" className="ingredient-form__label">
          Цвет типа
        </label>
        <input type="color" name="color" className="ingredient-form__input-color" />
      </div>
      <div className="ingredient-form__input-box">
        <label htmlFor="measure" className="ingredient-form__label">
          Ед. изм.
        </label>
        <input type="text" name="measure" className="ingredient-form__input-text" autoComplete="off"/>
      </div>
      <div className="ingredient-form__input-box">
        <label htmlFor="weight" className="ingredient-form__label">
          Вес одной единицы
        </label>
        <input type="number" name="weight" className="ingredient-form__input-text" min={0} />
      </div>
      <div className="ingredient-form__input-box">
        <label htmlFor="price" className="ingredient-form__label">
          Цена
        </label>
        <input type="number" name="price" className="ingredient-form__input-text" min={0} />
      </div>
      <button className="ingredient-form__approve-btn"></button>
    </form>
  );
}

export default AddIngredientForm;
