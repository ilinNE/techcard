import { FC } from "react";
import "./Avatar.scss";
import avatar from "../../images/avatar.svg";
import { NavLink } from "react-router-dom";
import { IAvatarProps } from "./IAvatar";

const Avatar: FC<IAvatarProps> = ({ handleCloseBurgerMenu, isBurgerOpen }) => {
  return (
    <NavLink className="avatar" onClick={handleCloseBurgerMenu} to="/profile">
      <img className="avatar-image" src={avatar} alt="Аватар" />
      {isBurgerOpen && <p className="avatar__name">Имя пользователя</p>}
    </NavLink>
  );
};

export default Avatar;
