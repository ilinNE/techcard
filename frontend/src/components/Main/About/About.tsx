import { FC } from "react";
import FeedbackForm from "../FeedbackForm/FeedbackForm";
import { about } from "../../../utils/textСonstants";
import "./About.scss";

interface AboutProps {
  aboutTitle: string;
  aboutParagraphOne: string;
  aboutParagraphTwo: string;
}

const About: FC<AboutProps> = ({ aboutTitle, aboutParagraphOne, aboutParagraphTwo }) => {
  return (
    <section className="about">
      <h2 className="about__title">{aboutTitle}</h2>
      <p className="about__text">{aboutParagraphOne}</p>
      <p className="about__text">{aboutParagraphTwo}</p>
      <FeedbackForm buttonText={about.SendButton} />
      <div className="about__wave_blue"></div>
      <div className="about__wave_green"></div>
    </section>
  );
};

export default About;
