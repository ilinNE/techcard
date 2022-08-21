import { FeedbackParams } from "../../../../utils/Api/ApiTypes";

export interface IFormProps {
  buttonText: string;
  handleFeedback: (values: FeedbackParams) => void;
}

export type FormInputs = {
  feedbackTitle: string;
  feedbackEmail: string;
  feedbackMessage: string;
};
