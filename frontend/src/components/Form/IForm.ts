import { FormParams } from "../../utils/Api/ApiTypes";

export interface IFormProps {
  buttonText: string;
  handleSubmitForm: (values: FormParams) => void;
}

export type FormInputs = {
  login: string;
  email: string;
  password: string;
};
