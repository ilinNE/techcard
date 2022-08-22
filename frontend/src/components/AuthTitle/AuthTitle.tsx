import { FC } from "react";
import "./AuthTitle.scss";
import { IAuthTitleProps } from "./IAuthTitle";

const AuthTitle: FC<IAuthTitleProps> = ({ titleText }) => {
  return <h1 className="authTitle">{titleText}</h1>;
};

export default AuthTitle;
