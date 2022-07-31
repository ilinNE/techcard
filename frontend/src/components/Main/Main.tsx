import { FC } from "react";
import "./Main.scss";
import Greeting from "./Greeting/Greeting";
import { greeting } from "../../utils/textСonstants";

const Main: FC = () => {
  return (
    <section>
      <Greeting greetingTitle={greeting.Title} greetingSubtitle={greeting.SubTitle} buttonTitle={greeting.LetStart} />
    </section>
  );
};

export default Main;
