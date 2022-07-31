import { FC } from "react";
import { useNavigate } from "react-router-dom";
import AuthTitle from "../AuthTitle/AuthTitle";
import Form from "../Form/Form";
import "./Register.scss";
import * as Api from "../../utils/Api";
import { register } from "../../utils/textСonstants";

const Register: FC = () => {
  const navigate = useNavigate();

  const handleRegister = (values: any) => {
    Api.register(values)
      .then((data) => {
        alert("Регистрация пользователя " + data.username + " прошла успешно");
        navigate("/dishes");
      })
      .catch((error) => console.error(error));
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
    </section>
  );
};

export default Register;
