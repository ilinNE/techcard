import { FC, useEffect } from "react";
import { IPopupProps } from "./IPopup";
import "./Popup.scss";

const Popup: FC<IPopupProps> = ({ text, closePopup }) => {
  useEffect(() => {
    const closeByEscape = (evt: any) => {
      closePopup(evt);
    };
    document.addEventListener("keydown", closeByEscape);
    return () => document.removeEventListener("keydown", closeByEscape);
  }, []);

  return (
    <section onClick={closePopup} className="popup">
      <div className="popup__container">
        <button className="popup__close-button"></button>
        <p className="popup__text">{text}</p>
      </div>
    </section>
  );
};

export default Popup;
