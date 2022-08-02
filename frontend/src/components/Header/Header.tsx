import { FC, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Header.scss";
import Nav from "./Nav/Nav";
import Avatar from "../Avatar/Avatar";
import { logoHeader, whiteHeader } from "../../utils/constants";
import BurgerMenu from "./BurgerMenu/BurgerMenu";
import Logo from "./Logo/Logo";
import AuthNav from "./AuthNav/AuthNav";
import MainNav from "./MainNav/MainNav";

interface HeaderProps {
  loggedIn: boolean;
}

const Header: FC<HeaderProps> = ({ loggedIn }) => {
  const [isBurgerOpen, setIsBurgerOpen] = useState<boolean>(false);
  const { pathname } = useLocation();

  const handleOpenBurgerMenu = () => {
    setIsBurgerOpen(true);
  };

  const handleCloseBurgerMenu = () => {
    setIsBurgerOpen(false);
  };

  return (
    <section className={`header ${whiteHeader.includes(pathname) && "header_main"}`}>
      <div className="header__content">
        <Logo />

        {!logoHeader.includes(pathname) && (
          <>
            {loggedIn ? (
              <>
                <div className="header__hide">
                  <Nav />
                </div>
                <div className="header__hide">
                  <Avatar />
                </div>
              </>
            ) : (
              <>
                <MainNav /> <AuthNav />
              </>
            )}
          </>
        )}
        {loggedIn && (
          <button
            onClick={isBurgerOpen ? handleCloseBurgerMenu : handleOpenBurgerMenu}
            className={`header__burger-button ${isBurgerOpen && "header__burger-button_close"}  `}
          />
        )}
      </div>

      <BurgerMenu handleCloseBurgerMenu={handleCloseBurgerMenu} isBurgerOpen={isBurgerOpen} />
    </section>
  );
};

export default Header;
