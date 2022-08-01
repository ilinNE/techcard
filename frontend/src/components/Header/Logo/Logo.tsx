import { FC } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Logo.scss";
import logoWhite from "../../../images/logo-white.svg";
import logoRed from "../../../images/logo-red.svg";
import { whiteHeader } from "../../../utils/constants";

const Logo: FC = () => {
  const { pathname } = useLocation();

  return (
    <NavLink className="logo" to="/">
      <img className="logo__image" src={whiteHeader.includes(pathname) ? logoRed : logoWhite} alt="Логотип"></img>
    </NavLink>
  );
};

export default Logo;
