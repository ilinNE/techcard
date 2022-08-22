import { FC } from "react";
import "./Reference.scss";
// import { Link } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
import { IReferenceProps, LinkVariant } from "./IReference";

const Reference: FC<IReferenceProps> = ({ textDescription, textLink, path }) => {
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
