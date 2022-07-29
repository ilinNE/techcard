import { FC } from "react";
import "./Main.scss";
import Greeting from "./Greeting/Greeting";

const Main: FC<{}> = () => {

  return (
    <div>
      <Greeting />
    </div>
  );
};

export default Main;
