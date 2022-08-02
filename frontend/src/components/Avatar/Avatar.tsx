import { FC } from "react";
import "./Avatar.scss";
import avatar from "../../images/avatar.svg";
import { NavLink } from "react-router-dom";

interface AvatarProps {
  handleCloseBurgerMenu?: () => void;
  isBurgerOpen?: boolean;
}

const Avatar: FC<AvatarProps> = ({ handleCloseBurgerMenu, isBurgerOpen }) => {
  console.log(isBurgerOpen);

  return (
    <NavLink className="avatar" onClick={handleCloseBurgerMenu} to="/profile">
      <img className="avatar-image" src={avatar} alt="Аватар" />
      {isBurgerOpen && <p className="avatar__name">Имя пользователя</p>}
    </NavLink>
  );
};

export default Avatar;
