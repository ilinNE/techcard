import { FC, useState } from "react";
import "./SideMenu.scss";
import soup from "../../images/soup.svg";
import jar from "../../images/jar.svg";
import tomato from "../../images/tomato.svg";
import { SideMenuItem } from "../SideMenuItem/SideMenuItem";
import { ISideMenu } from "./ISideMenu";

const SideMenu: FC<ISideMenu> = (props) => {
  const [isTagListOpen, setIsTagListOpen] = useState<boolean>(false);

  const handleCloseMenu = () => {
    props.setIsOpenSideMenu(!props.isOpenSideMenu);
  };

  const handleTagList = () => {
    setIsTagListOpen(!isTagListOpen);
  };

  return (
    <section className={`sidemenu ${props.isOpenSideMenu ? "" : "sidemenu_close"}`}>
      <button
        className={`sidemenu__close-btn ${props.isOpenSideMenu ? "sidemenu__close-btn_open" : ""}`}
        onClick={handleCloseMenu}
      ></button>
      <nav className="sidemenu__navigation">
        <SideMenuItem
          navlink={"/techcards/dishes"}
          title={"Блюда"}
          text={<>Мои&nbsp;блюда</>}
          image={soup}
          isTagListOpen={isTagListOpen}
          handleTagList={handleTagList}
          isOpenSideMenu={props.isOpenSideMenu}
        />
        <SideMenuItem
          navlink={"/techcards/semis"}
          title={"Полуфабрикаты"}
          text={"Полуфабрикаты"}
          image={jar}
          isTagListOpen={isTagListOpen}
          handleTagList={handleTagList}
          isOpenSideMenu={props.isOpenSideMenu}
          class={"sidemenu-item__link-img_correction"}
        />
        <SideMenuItem
          navlink={"/techcards/foodstuff"}
          title={"Продукты"}
          text={"Продукты"}
          image={tomato}
          isTagListOpen={isTagListOpen}
          handleTagList={handleTagList}
          isOpenSideMenu={props.isOpenSideMenu}
        />
      </nav>
    </section>
  );
};

export { SideMenu };
