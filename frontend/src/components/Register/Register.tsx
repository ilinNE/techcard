import { FC, SetStateAction } from "react";
import AuthTitle from "../AuthTitle/AuthTitle";
import Form from "../Form/Form";
import "./Register.scss";
import Popup from "../Popup/Popup";
import { register } from "../../utils/textConstants";

interface RegisterProps {
  handleRegister: (values: any) => void;
  errorMesage: string;
  setErrorMesage: React.Dispatch<SetStateAction<string>>;
}

const Register: FC<RegisterProps> = ({ handleRegister, errorMesage, setErrorMesage }) => {
  const closePopup = (evt: any) => {
    if (evt.currentTarget === evt.target || evt.target.classList.contains("popup__close-button")) {
      setErrorMesage("");
    }
  };

  return (
    <section className="register">
      <AuthTitle titleText={register.Welcome} />
      <Form
        buttonText={register.Signup}
        textDescription={register.AlreadyRegistered}
        textLink={register.Login}
        handleSubmitForm={handleRegister}
      />
      {errorMesage && <Popup text={errorMesage} closePopup={closePopup} />}
    </section>
  );
};
export default Register;
