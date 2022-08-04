import { FC, SetStateAction } from "react";
import AuthTitle from "../AuthTitle/AuthTitle";
import Form from "../Form/Form";
import "./Login.scss";
import Popup from "../Popup/Popup";
import { login } from "../../utils/textConstants";

interface LoginProps {
  handleAuthorize: (values: any) => void;
  errorMesage: string;
  setErrorMesage: React.Dispatch<SetStateAction<string>>;
}

const Login: FC<LoginProps> = ({ handleAuthorize, errorMesage, setErrorMesage }) => {
  const closePopup = (evt: any) => {
    if (evt.currentTarget === evt.target || evt.target.classList.contains("popup__close-button")) {
      setErrorMesage("");
    }
  };

  return (
    <section className="register">
      <AuthTitle titleText={login.ToBegin} />
      <Form
        buttonText={login.Signin}
        textDescription={login.NotRegistred}
        textLink={login.Registration}
        handleSubmitForm={handleAuthorize}
      />
      {errorMesage && <Popup text={errorMesage} closePopup={closePopup} />}
    </section>
  );
};

export default Login;
