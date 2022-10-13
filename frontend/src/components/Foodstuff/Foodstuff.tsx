import { FC } from "react";
import { Ingredient } from "../Ingredient/Ingredient";
import "./Foodstuff.scss";

const Foodstuff: FC = () => {
  return (
    <section className="foodstuff">
      <div className="foodstuff__overflow-box">
        <form action="" className="foodstuff__form">
          <div className="foodstuff__input-box">
            <label htmlFor="name" className="foodstuff__label">
              Наименование
            </label>
            <input type="text" name="name" className="foodstuff__input-text" />
          </div>

          <div className="foodstuff__input-box">
            <label htmlFor="type" className="foodstuff__label">
              Тип продукта
            </label>
            <input type="text" name="type" className="foodstuff__input-text" />
          </div>
          <div className="foodstuff__input-box">
            <label htmlFor="measure" className="foodstuff__label">
              Ед. изм.
            </label>
            <input type="text" name="measure" className="foodstuff__input-text" />
          </div>
          <div className="foodstuff__input-box">
            <label htmlFor="weight" className="foodstuff__label">
              Вес одной единицы
            </label>
            <input type="number" name="weight" className="foodstuff__input-text" min={0} />
          </div>
          <div className="foodstuff__input-box">
            <label htmlFor="price" className="foodstuff__label">
              Цена
            </label>
            <input type="number" name="price" className="foodstuff__input-text" min={0} />
          </div>
          <div className="foodstuff__input-box">
            <label htmlFor="color" className="foodstuff__label">
              Цвет
            </label>
            <input type="color" name="color" className="foodstuff__input-color" />
          </div>
          <button className="foodstuff__approve-btn"></button>
        </form>
      </div>
      <ul className="foodstuff__list">
        <Ingredient />
        <Ingredient />
        <Ingredient />
        <Ingredient />
        <Ingredient />
        <Ingredient />
        <Ingredient />
        <Ingredient />
      </ul>
    </section>
  );
};

export default Foodstuff;
