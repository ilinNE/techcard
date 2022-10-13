import { FC } from "react";
import { IProfilePopup } from "./IProfilePopup";

import avatar from "../../images/avatar.svg";
import "./ProfilePopup.scss";

const ProfilePopup: FC<IProfilePopup> = (props) => {
  return (
    <div className={`profile-popup ${props.isProfilePopupOpen ? "profile-popup_active" : ""}`} >
      <div className="profile-popup__container">
        <button
          className="profile-popup__close-button"
          onClick={() => props.setIsProfilePopupOpen(false)}
        ></button>
        <img src={avatar} alt="аватар" className="profile-popup__avatar"/>
        <form action="" className="profile-popup__form">
          <label className="profile-popup__input-file-box">
            <input
              type="file"
              name="photo"
              className="profile-popup__input-file"
              accept="image/*"
            />
            <span className="profile-popup__input-file-btn">Загрузить фото</span>
            <span className="profile-popup__info-text">
              Форматы .jpg, .png, .gif. Макс. размер 5мб.
            </span>
          </label>
          <p className="profile-popup__text">или укажите адрес изображения:</p>
          <input
            className="profile-popup__input"
            type="url"
            name="url-img"
            id="url-img"
            placeholder="https://example/image.jpg"
          />
          <button className="profile-popup__save-button" type="submit">
            Сохранить
          </button>
        </form>
      </div>
    </div>
  );
};

export { ProfilePopup };
