import { FC, Fragment } from "react";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { questions } from "../../utils/textConstants";
import "./Guide.scss";
import arrow from "../../images/arrow-big.svg";
import Reference from "../Reference/Reference";
import { IDetails, IIcon } from "./IGuide";
import { LinkVariant } from "../Reference/IReference";

const Guide: FC = () => {
  function getImage(icon: IIcon) {
    return <img className={`accordion__${icon.className}`} src={icon.src} alt={icon.alt} />;
  }
  function getDetails(details: IDetails, index: number) {
    return (
      <p key={index} className="accordion__paragraph">
        {details.text.map((value, index) => {
          return (
            <Fragment key={index}>
              {value}
              {index !== details.text.length - 1 && getImage(details.icons[index])}
            </Fragment>
          );
        })}
      </p>
    );
  }
  return (
    <section className="guide-section">
      <h1 className="guide-section__title">{questions.Title}</h1>
      {questions.QuestionList.map((question, index) => {
        return (
          <Accordion key={index} className="accordion" disableGutters={true}>
            <AccordionSummary
              expandIcon={<img src={arrow} alt="стрелка вниз" className="accordion__arrow" />}
              className="accordion__summary"
            >
              {question.header}
            </AccordionSummary>
            <AccordionDetails className="accordion__details">
              {question.details.map((info, index) => getDetails(info, index))}
            </AccordionDetails>
          </Accordion>
        );
      })}
      <Reference
        textDescription={questions.Paragraph}
        textLink={questions.Link}
        path={LinkVariant.toFeedback}
      />
      <div className="guide-section__wave"></div>
    </section>
  );
};

export default Guide;
