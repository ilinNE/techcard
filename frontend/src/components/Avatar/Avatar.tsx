import { FC } from "react";
import "./Avatar.scss";
import avatar from "../../images/avatar.svg";
import { NavLink, useNavigate } from "react-router-dom";

interface AvatarProps {
  handleCloseBurgerMenu?: () => void;
}

const Avatar: FC<AvatarProps> = ({ handleCloseBurgerMenu }) => {
  return (
    <NavLink className="avatar link-opacity" onClick={handleCloseBurgerMenu} to="/profile">
      <img className="avatar-image" src={avatar} alt="Аватар" />
    </NavLink>
  );
};

export default Avatar;
