import React, { FC } from "react";
import "./Avatar.scss";
import avatar from "../../images/avatar.svg";
import { useNavigate } from "react-router-dom";

const Avatar: FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <img onClick={() => navigate("/profile")} className="avatar link-opacity" src={avatar} alt="Аватар"></img>
    </div>
  );
};

export default Avatar;
