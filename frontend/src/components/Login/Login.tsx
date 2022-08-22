import { FC } from "react";
import AuthTitle from "../AuthTitle/AuthTitle";
import Form from "../Form/Form";
import "./Login.scss";
import Popup from "../Popup/Popup";
import { login } from "../../utils/textConstants";
import Reference from "../Reference/Reference";
import { ILoginProps } from "./ILogin";
import { LinkVariant } from "../Reference/IReference";

const Login: FC<ILoginProps> = ({ handleAuthorize, errorMesage, setErrorMesage }) => {
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
      <AuthTitle titleText={login.ToBegin} />
      <Form buttonText={login.Signin} handleSubmitForm={handleAuthorize} />
      <Reference
        textDescription={login.NotRegistred}
        textLink={login.Registration}
        path={LinkVariant.toRegister}
      />
      {errorMesage && <Popup text={errorMesage} closePopup={closePopup} />}
    </section>
  );
};

export default Login;
