import { SetStateAction } from "react";

export interface IAboutProps {
  aboutTitle: string;
  aboutParagraphOne: string;
  aboutParagraphTwo: string;
  handleFeedback: (values: any) => void;
  errorMesage: string;
  setErrorMesage: React.Dispatch<SetStateAction<string>>;
}
