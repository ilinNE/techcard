import { FC, SetStateAction } from "react";
import "./Main.scss";
import Greeting from "./Greeting/Greeting";
import About from "./About/About";
import { greeting, about } from "../../utils/textConstants";

interface MainProps {
  handleFeedback: (values: any) => void;
  errorMesage: string;
  setErrorMesage: React.Dispatch<SetStateAction<string>>;
}

const Main: FC<MainProps> = ({ handleFeedback, errorMesage, setErrorMesage }) => {
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
