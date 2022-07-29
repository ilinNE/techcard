import { FC } from "react";
import "./Main.scss";
import Header from "../Header/Header";
import Greeting from "../../components/Main/Greeting/Greeting";

interface MainProps {
  loggedIn: boolean;
}

const Main: FC<MainProps> = ({ loggedIn }) => {

  return (
    <div>
      <Header loggedIn={loggedIn} />
      <Greeting />
    </div>
  );
};

export default Main;
