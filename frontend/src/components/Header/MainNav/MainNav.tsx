import { FC } from "react";
import "./MainNav.scss";
import { header } from "../../../utils/textConstants";

const Nav: FC = () => {
  return (
    <section className="MainNav">
      <a href="#about" className="MainNav__link">
        {header.Aboute}
      </a>
      <a href="#tariffs" className="MainNav__link">
        {header.Tariffs}
      </a>
    </section>
  );
};

export default Nav;
