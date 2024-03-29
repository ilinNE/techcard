import { FC } from "react";
import FeedbackForm from "./FeedbackForm/FeedbackForm";
import { about } from "../../../utils/textConstants";
import "./About.scss";
import Popup from "../../Popup/Popup";
import { IAboutProps } from "./IAbout";

const About: FC<IAboutProps> = ({
  aboutTitle,
  aboutParagraphOne,
  aboutParagraphTwo,
  handleFeedback,
  errorMesage,
  setErrorMesage,
}) => {
  const closePopup = (evt: any) => {
    if (
      evt.currentTarget === evt.target ||
      evt.target.classList.contains("popup__close-button") ||
      evt.key === "Escape"
    ) {
      setErrorMesage("");
    }
  };

  return (
    <>
      {errorMesage && <Popup text={errorMesage} closePopup={closePopup} />}
      <section id="about" className="about">
        <div className="about__wave about__wave_blue"></div>
        <h2 className="about__title">{aboutTitle}</h2>
        <p className="about__text">
          {aboutParagraphOne} <br /> <br /> {aboutParagraphTwo}
        </p>
        <FeedbackForm buttonText={about.SendButton} handleFeedback={handleFeedback} />
        <div className="about__wave about__wave_green"></div>
      </section>
    </>
  );
};

export default About;
