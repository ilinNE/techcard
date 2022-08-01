import { FC, useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Header.scss";
import Nav from "./Nav/Nav";
import Avatar from "../Avatar/Avatar";
import { MEDIUM_SCREEN, logoHeader, whiteHeader } from "../../utils/constants";
import BurgerMenu from "./BurgerMenu/BurgerMenu";
import Logo from "./Logo/Logo";
import AuthNav from "./AuthNav/AuthNav";
import MainNav from "./MainNav/MainNav";

interface HeaderProps {
  loggedIn: boolean;
}

const Header: FC<HeaderProps> = ({ loggedIn }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= MEDIUM_SCREEN);
  const [isBurger, setIsBurger] = useState<boolean>(false);
  const { pathname } = useLocation();

  const updateWidth = useCallback(() => {
    const newWidth = window.innerWidth <= MEDIUM_SCREEN;
    if (newWidth !== isMobile) {
      setIsMobile(newWidth);
    }
  }, [isMobile]);

  const handleOpenBurgerMenu = () => {
    setIsBurger(true);
  };

  const handleCloseBurgerMenu = () => {
    setIsBurger(false);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [updateWidth]);

  return (
    <section className={`header ${whiteHeader.includes(pathname) && "header_main"}`}>
      <div className="header__content">
        <Logo />

        {!logoHeader.includes(pathname) && (
          <>
            {isMobile && loggedIn ? (
              <button onClick={handleOpenBurgerMenu} className="header__burger-button" />
            ) : (
              <>
                {loggedIn ? (
                  <>
                    <Nav /> <Avatar />
                  </>
                ) : (
                  <>
                    <MainNav /> <AuthNav isMobile={isMobile} />
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
      {isMobile && <BurgerMenu handleCloseBurgerMenu={handleCloseBurgerMenu} isBurger={isBurger} />}
    </section>
  );
};

export default Header;
