import { FC } from "react";
import { Link } from "react-router-dom";
import "./AuthNav.scss";
import { header } from "../../../utils/textСonstants";

const AuthNav: FC = () => {
  return (
    <section className="authNav__section">
      <Link className="authNav__link" to="/signin">
        {header.AuthLogin}
      </Link>
      <Link className="authNav__link" to="/signup">
        <button className="authNav__button">{header.AuthRegistration}</button>
      </Link>
    </section>
  );
};

export default AuthNav;
