import { SetStateAction } from "react";

export interface ILoginProps {
  handleAuthorize: (values: any) => void;
  errorMesage: string;
  setErrorMesage: React.Dispatch<SetStateAction<string>>;
}
