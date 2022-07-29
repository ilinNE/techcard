import React, { FC, useCallback, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./Header.scss";
import logoWhite from "../../images/logo-white.svg";
import logoRed from "../../images/logo-red.svg";
import Nav from "../Nav/Nav";
import Avatar from "../Avatar/Avatar";
import { MEDIUM, logoHeader, whiteHeader } from "../../utils/constants";

interface HeaderProps {
  loggedIn: boolean;
}

const Header: FC<HeaderProps> = ({ loggedIn }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= MEDIUM);

  const { pathname } = useLocation();
  console.log(pathname);

  const updateWidth = useCallback(() => {
    const newWidth = window.innerWidth <= MEDIUM;
    if (newWidth !== isMobile) {
      setIsMobile(newWidth);
    }
  }, [isMobile]);

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [updateWidth]);

  return (
    <section className={`header ${whiteHeader.includes(pathname) && "header_main"}`}>
      <div className="header__content">
        <NavLink to="/">
          <img className="header__logo" src={whiteHeader.includes(pathname) ? logoRed : logoWhite} alt="Логотип"></img>
        </NavLink>
        {!logoHeader.includes(pathname) && (
          <>
            {isMobile && pathname !== "/" ? (
              <button className="header__burger-button" />
            ) : (
              <>
                <Nav loggedIn={loggedIn} />
                {loggedIn ? (
                  <Avatar />
                ) : (
                  <div className="header__auth">
                    <Link className="header__link" to="/signin">
                      Войти
                    </Link>
                    <Link className="header__link" to="/signup">
                      <button className="header__button">Регистрация</button>
                    </Link>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Header;
