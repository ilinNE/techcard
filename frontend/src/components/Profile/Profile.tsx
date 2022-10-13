import { FC, useState } from "react";
import "./Profile.scss";
import { IProfileProps } from "./IProfile";
// import { useSelector } from "react-redux";
import avatar from "../../images/avatar.svg";
import { ProfilePopup } from "../ProfilePopup/ProfilePopup";

// interface RootState {
//   currentUser: any;
// }

const Profile: FC<IProfileProps> = ({ handleloggedOutClick }) => {
  // const { currentUser } = useSelector((state: RootState) => state.currentUser);
  const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);

  return (
    <div className="profile">
      <div className="profile__photo-box">
        <img
          className="profile__photo"
          width={"150px"}
          height={"150px"}
          src={avatar}
          alt="аватар"
        />
        <button className="profile__change-button" onClick={() => setIsProfilePopupOpen(true)}>
          Поменять
        </button>
      </div>
      <form className="profile__form">
        <div className="profile__input-box">
          <input
            type="text"
            className="profile__input"
            id="profile-name"
            placeholder="Имя"
            required
          />
        </div>
        <div className="profile__line"></div>
        <div className="profile__input-box">
          <input
            type="email"
            className="profile__input"
            id="profile-email"
            placeholder="Email"
            required
          />
        </div>
        {/* {errorName !== "" && <span className="profile__error">{errorName}</span>}
          {errorEmail !== "" && <span className="profile__error">{errorEmail}</span>}
          {props.authMessage !== "" && <span className="profile__error">{props.authMessage}</span>} */}
        <button type="submit" className="profile__edit-button">
          Редактировать
        </button>
      </form>
      <button className="profile__exit-button" onClick={handleloggedOutClick}>
        Выйти
      </button>
      <div className="profile__wave"></div>
      <ProfilePopup
        isProfilePopupOpen={isProfilePopupOpen}
        setIsProfilePopupOpen={setIsProfilePopupOpen}
      /> 
    </div>
  );
};

export default Profile;
