import { FC } from "react";
import { Link } from "react-router-dom";
import { ISideMenuItemProps } from "./ISideMenuItemProps";

import "./SideMenuItem.scss";


const SideMenuItem: FC<ISideMenuItemProps> = (props) => {
  
    return (
          <li className="sidemenu-item">
            <Link className="sidemenu-item__link" to={props.navlink}>
              <img className={`sidemenu-item__link-img ${props.class}`} src={props.image} alt={props.title} title={props.title} />
            </Link>
            <div
              className={`sidemenu-item__text-navigation ${
                props.isOpenSideMenu ? "" : "sidemenu-item__text-navigation_close"
              }`}
            >
              <Link to={props.navlink} className="sidemenu-item__link">
                <p className="sidemenu-item__link-text">{props.text}</p>
              </Link>
              <button
                onClick={props.handleTagList}
                className={`sidemenu-item__sublist-btn ${props.isTagListOpen && "sidemenu-item__sublist-btn_open"}`}
              ></button>
            </div>
          </li>
   );
};

  export { SideMenuItem };