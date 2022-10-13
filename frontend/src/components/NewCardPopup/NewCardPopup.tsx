import { FC, useEffect } from "react";

import "./NewCardPopup.scss";

const NewCardPopup: FC = () => {
  return (
    <section className="new-card-popup">
      <div className="new-card-popup__container">
        <button className="new-card-popup__close-button"></button>
        <button className="new-card-popup__save-button"></button>
      </div>
    </section>
  );
};

export default NewCardPopup;
