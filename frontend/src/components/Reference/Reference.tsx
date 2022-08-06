import { FC } from "react";
import "./Reference.scss";
import { Link } from "react-router-dom";

export enum LinkVariant {
  toRegister = "/signup",
  toLogin = "/signin",
  toFeedback = "/",
}

interface ReferenceProps {
  textDescription: string;
  textLink: string;
  path: LinkVariant;
}

const Reference: FC<ReferenceProps> = ({ textDescription, textLink, path }) => {
  return (
    <p className="reference" style={path === LinkVariant.toFeedback ? { marginTop: 100 } : {}}>
      {textDescription}
      <Link to={path} className="reference__link">
        {textLink}
      </Link>
    </p>
  );
};

export default Reference;
