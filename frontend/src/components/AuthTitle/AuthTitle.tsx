import React, { FC } from "react";
import "./AuthTitle.scss";

interface AuthTitleProps {
  titleText: string;
}

const AuthTitle: FC<AuthTitleProps> = ({ titleText }) => {
  return <h1 className="authTitle">{titleText}</h1>;
};

export default AuthTitle;
