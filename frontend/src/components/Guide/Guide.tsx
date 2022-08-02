import { FC, Fragment } from "react";
import "./Guide.scss";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';

import { questions } from "../../utils/textСonstants"

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
    return <img className={icon.className} src={icon.src} alt={icon.alt} />
  }
  function getDetails(details: Details, index: number) {
    return <Fragment key={index}>
      {details.text.map((value, index) => {
        return <Fragment key={index}>
          {value}
          {index !== details.text.length - 1 && getImage(details.icons[index])}
        </Fragment>
      })}</Fragment>
  }
  return (
    <section>
      <h1>{questions.Title}</h1>
      {questions.QuestionList.map((question, index) => {
        return <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            {question.header}
          </AccordionSummary>
          <AccordionDetails>
            {question.details.map((info, index) => getDetails(info, index))}
          </AccordionDetails>
        </Accordion>
      })}
    </section>
  );
};

export default Guide;
