import { FC } from "react";
import AuthTitle from "../AuthTitle/AuthTitle";
import Form from "../Form/Form";
import "./Register.scss";
import Popup from "../Popup/Popup";
import { register } from "../../utils/textConstants";
import Reference from "../Reference/Reference";
import { LinkVariant } from "../Reference/IReference";
import { IRegisterProps } from "./IRegister";

const Register: FC<IRegisterProps> = ({ handleRegister, errorMesage, setErrorMesage }) => {
  const closePopup = (evt: any) => {
    if (
      evt.currentTarget === evt.target ||
      evt.target.classList.contains("popup__close-button") ||
      evt.key === "Escape"
    ) {
      setErrorMesage("");
    }
  };

  return (
    <section className="register">
      <AuthTitle titleText={register.Welcome} />
      <Form buttonText={register.Signup} handleSubmitForm={handleRegister} />
      <Reference
        textDescription={register.AlreadyRegistered}
        textLink={register.Login}
        path={LinkVariant.toLogin}
      />
      {errorMesage && <Popup text={errorMesage} closePopup={closePopup} />}
    </section>
  );
};
export default Register;
