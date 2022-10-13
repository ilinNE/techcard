import { FC } from "react";
import "./Main.scss";
import Greeting from "./Greeting/Greeting";
import About from "./About/About";
import { greeting, about } from "../../utils/textConstants";
import { IMainProps } from "./IMain";
import { Planslist } from "./Planslist/Planslist";

const Main: FC<IMainProps> = ({ handleFeedback }) => {
  return (
    <section>
      <Greeting
        greetingTitle={greeting.Title}
        greetingSubtitle={greeting.SubTitle}
        buttonTitle={greeting.LetStart}
      />
      <About
        aboutTitle={about.Title}
        aboutParagraphOne={about.ParagraphOne}
        aboutParagraphTwo={about.ParagraphTwo}
        handleFeedback={handleFeedback}
      />
      <Planslist />
    </section>
  );
};

export default Main;
