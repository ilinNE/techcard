import { SetStateAction } from "react";

export interface IRegisterProps {
  handleRegister: (values: any) => void;
  errorMesage: string;
  setErrorMesage: React.Dispatch<SetStateAction<string>>;
}
