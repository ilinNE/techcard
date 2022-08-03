import { FC } from "react";
import "./Popup.scss";

interface PopupProps {
  text: string;
  closePopup: (evt: any) => void;
}

const Popup: FC<PopupProps> = ({ text, closePopup }) => {
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
