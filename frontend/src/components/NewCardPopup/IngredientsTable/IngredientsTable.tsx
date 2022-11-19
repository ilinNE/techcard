import { useState } from "react";
import "./IngredientsTable.scss";
import IngredientsTableItem from "./IngredientsTableItem/IngredientsTableItem";

function IngredientsTable() {
  const [inputIdList, setInputIdList] = useState<any>([]);
  const addIngredientsItem = (evt: any) => {
    evt.preventDefault();
    setInputIdList([...inputIdList, Date.now()]);
  };

  const deleteIngredientsItem = (id: number) => {
    setInputIdList(inputIdList.filter((input:any) => input !== id))
  };

  return (
    <div className="ingredients-table">
      <ul className="ingredients-table__headers">
        <li className="ingredients-table__header">Ингредиент</li>
        <li className="ingredients-table__header">Количество</li>
        <li className="ingredients-table__header">Холодный отход, %</li>
        <li className="ingredients-table__header">Горячий отход, %</li>
      </ul>
      <div className="ingredients-table__list-box">
        <ul className="ingredients-table__list">
          {
            inputIdList.map((id:number) => (
              <IngredientsTableItem key={id} id={id} deleteIngredientsItem={deleteIngredientsItem} />
            ))
          }
        </ul>
      </div>
      <button className="ingredients-table__plus-btn" onClick={addIngredientsItem}></button>
    </div>
  );
}

export default IngredientsTable;
