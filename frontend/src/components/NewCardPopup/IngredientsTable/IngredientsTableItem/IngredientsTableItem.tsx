import "./IngredientsTableItem.scss";
import { IIngredientsTableItem } from "./IIngredientsTableItem";
import { FC } from "react";

const IngredientsTableItem: FC<IIngredientsTableItem> = (props) => {
  const handleDeleteInput = (evt:any) => {
    evt.preventDefault();
    props.deleteIngredientsItem(props.id);
  }
  return (
    <li className="ingredients-table-item">
      <button className="ingredients-table-item__minus-btn" onClick={handleDeleteInput}></button>
      <ul className="ingredients-table-item__row-list">
        <li className="ingredients-table-item__row-list-item">
          <input className="ingredients-table-item__input" type="search" />
        </li>
        <li className="ingredients-table-item__row-list-item">
          <input className="ingredients-table-item__input" type="number" min={0} step={0.1} />
        </li>
        <li className="ingredients-table-item__row-list-item">
          <input className="ingredients-table-item__input" type="number" min={0} max={100} step={0.1} />
        </li>
        <li className="ingredients-table-item__row-list-item">
          <input className="ingredients-table-item__input" type="number" min={0} max={100} step={0.1} />
        </li>
      </ul>
    </li>
  );
}

export default IngredientsTableItem;
