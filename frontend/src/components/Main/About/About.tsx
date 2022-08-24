import { FC } from "react";
import FeedbackForm from "./FeedbackForm/FeedbackForm";
import { about } from "../../../utils/textConstants";
import "./About.scss";
import Popup from "../../Popup/Popup";
import { IAboutProps } from "./IAbout";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage } from "../../store/reducers/popupMessageReducer";

interface RootState {
  popupMesage: { message: string };
}

const About: FC<IAboutProps> = ({
  aboutTitle,
  aboutParagraphOne,
  aboutParagraphTwo,
  handleFeedback,
}) => {
  const dispatch = useDispatch();
  const { message } = useSelector((state: RootState) => state.popupMesage);

  const closePopup = (evt: any) => {
    if (
      evt.currentTarget === evt.target ||
      evt.target.classList.contains("popup__close-button") ||
      evt.key === "Escape"
    ) {
      dispatch(clearMessage(""));
    }
  };

  return (
    <>
      {message && <Popup text={message} closePopup={closePopup} />}
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
