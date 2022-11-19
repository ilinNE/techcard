import { FC } from "react";
import "./EmptyContent.scss";
import { IEmptyContent } from "./IEmptyContent";

export const EmptyContent: FC<IEmptyContent> = (props) => {
  return (
    <>
      <p className="empty-title">Пока что пусто</p>
      <button className="add-button" onClick={() => props.setIsNewCardPopupOpen(true)}>Добавить</button>
    </>
  );
};
