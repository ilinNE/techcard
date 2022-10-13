import { FC } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { SideMenu } from "../SideMenu/SideMenu";
import { IWorkPlace } from "./IWorkPlace";
import "./WorkPlace.scss";

const WorkPlace: FC<IWorkPlace> = (props) => {
  const location = useLocation();

  return (
    <section className="workplace">
      <SideMenu setIsOpenSideMenu={props.setIsOpenSideMenu} isOpenSideMenu={props.isOpenSideMenu}/>
      {location.pathname === "/techcards" && (
        <>
          <div className="workplace__image"></div>
          <div className="workplace__bg"></div>
        </>
      )}
      <Outlet/>
    </section>
  );
};

export default WorkPlace;
