import { FC } from "react";
import "./Main.scss";
import Greeting from "./Greeting/Greeting";

const Main: FC<{}> = () => {
  return (
    <section>
      <Greeting />
    </section>
  );
};

export default Main;
