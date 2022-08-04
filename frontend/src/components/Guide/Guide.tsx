import { FC, Fragment } from "react";
import { Link } from "react-router-dom";
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { questions } from "../../utils/textСonstants"
import "./Guide.scss";
import arrow from "../../images/arrow-big.svg";

interface Icon {
  className: string;
  src: string;
  alt: string;
}

interface Details {
  text: string[];
  icons: Icon[];
}

const Guide: FC = () => {
  function getImage(icon: Icon) {
    return <img className={`accordion__${icon.className}`} src={icon.src} alt={icon.alt} />
  }
  function getDetails(details: Details, index: number) {
    return <p key={index} className="accordion__paragraph">
      {details.text.map((value, index) => {
        return <Fragment key={index}>
          {value}
          {index !== details.text.length - 1 && getImage(details.icons[index])}
        </Fragment>
      })}</p>
  }
  return (
    <section className="guide-section">
      <h1 className="guide-section__title">{questions.Title}</h1>
      {questions.QuestionList.map((question, index) => {
        return <Accordion key={index} className="accordion" disableGutters={true}>
          <AccordionSummary expandIcon={<img src={arrow} alt="стрелка вниз" className="accordion__arrow" />}
            className="accordion__summary">
            {question.header}
          </AccordionSummary>
          <AccordionDetails className="accordion__details">
            {question.details.map((info, index) => getDetails(info, index))}
          </AccordionDetails>
        </Accordion>
      })}
      <p className="guide-section__text">{questions.Paragraph}
        <Link to="/" className="guide-section__link">{questions.Link}</Link>
      </p>
      <div className="guide-section__wave"></div>
    </section>
  );
};

export default Guide;
