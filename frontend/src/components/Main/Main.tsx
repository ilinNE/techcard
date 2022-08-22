import { FC } from "react";
import "./Main.scss";
import Greeting from "./Greeting/Greeting";
import About from "./About/About";
import { greeting, about } from "../../utils/textConstants";
import { IMainProps } from "./IMain";

const Main: FC<IMainProps> = ({ handleFeedback, errorMesage, setErrorMesage }) => {
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
        errorMesage={errorMesage}
        setErrorMesage={setErrorMesage}
      />
    </section>
  );
};

export default Main;
