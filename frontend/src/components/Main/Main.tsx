import { FC } from "react";
import "./Main.scss";
import Greeting from "./Greeting/Greeting";
import About from "./About/About";
import { greeting, about } from "../../utils/textConstants";

const Main: FC = () => {
  return (
    <section>
      <Greeting greetingTitle={greeting.Title} greetingSubtitle={greeting.SubTitle} buttonTitle={greeting.LetStart} />
      <About aboutTitle={about.Title} aboutParagraphOne={about.ParagraphOne} aboutParagraphTwo={about.ParagraphTwo} />
    </section>
  );
};

export default Main;
