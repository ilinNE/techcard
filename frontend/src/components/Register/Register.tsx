import { FC } from "react";
import AuthTitle from "../AuthTitle/AuthTitle";
import Form from "../Form/Form";
import "./Register.scss";
import Popup from "../Popup/Popup";
import { register } from "../../utils/textConstants";
import Reference from "../Reference/Reference";
import { LinkVariant } from "../Reference/IReference";
import { IRegisterProps } from "./IRegister";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage } from "../store/reducers/popupMessageReducer";

interface RootState {
  popupMesage: { message: string };
}

const Register: FC<IRegisterProps> = ({ handleRegister }) => {
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
      <AuthTitle titleText={register.Welcome} />
      <Form buttonText={register.Signup} handleSubmitForm={handleRegister} />
      <Reference
        textDescription={register.AlreadyRegistered}
        textLink={register.Login}
        path={LinkVariant.toLogin}
      />
      {message && <Popup text={message} closePopup={closePopup} />}
    </section>
  );
};
export default Register;
