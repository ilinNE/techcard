import { SetStateAction } from "react";

export interface IMainProps {
  handleFeedback: (values: any) => void;
  errorMesage: string;
  setErrorMesage: React.Dispatch<SetStateAction<string>>;
}
