import { FC } from "react";
import AuthTitle from "../AuthTitle/AuthTitle";
import Form from "../Form/Form";
import "./Login.scss";
import { login } from "../../utils/textСonstants";

const Login: FC = () => {
  const handleLogin = (values: any) => {
    console.log(values);
  };

  return (
    <section className="register">
      <AuthTitle titleText={login.ToBegin} />
      <Form
        buttonText={login.Signin}
        textDescription={login.NotRegistred}
        textLink={login.Registration}
        handleSubmitForm={handleLogin}
      />
    </section>
  );
};

export default Login;
