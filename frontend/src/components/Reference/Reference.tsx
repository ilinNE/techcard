import { FC } from "react";
import "./Reference.scss";
// import { Link } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";

export enum LinkVariant {
  toRegister = "/signup",
  toLogin = "/signin",
  toFeedback = "/#about",
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
