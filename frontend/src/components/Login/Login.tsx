import { FC } from "react";
import AuthTitle from "../AuthTitle/AuthTitle";
import Form from "../Form/Form";
import "./Login.scss";
import Popup from "../Popup/Popup";
import { login } from "../../utils/textConstants";
import Reference from "../Reference/Reference";
import { ILoginProps } from "./ILogin";
import { LinkVariant } from "../Reference/IReference";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage } from "../store/reducers/popupMessageReducer";

interface RootState {
  popupMesage: { message: string };
}

const Login: FC<ILoginProps> = ({ handleAuthorize }) => {
  const dispatch = useDispatch();
  const { message } = useSelector((state: RootState) => state.popupMesage);

  const closePopup = (evt: any) => {
    if (
      evt.currentTarget === evt.target ||
      evt.target.classList.contains("popup__close-button") ||
      evt.key === "Escape"
    ) {
      dispatch(clearMessage(""));
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
      {message && <Popup text={message} closePopup={closePopup} />}
    </section>
  );
};

export default Login;
