import { FC } from "react";
import AddIngredientForm from "../UI/AddIngredientForm/AddIngredientForm";
import { Ingredient } from "../UI/Ingredient/Ingredient";
import "./Foodstuff.scss";

const Foodstuff: FC = () => {
  return (
    <section className="foodstuff">
      <div className="foodstuff__overflow-box">
        <AddIngredientForm />
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
