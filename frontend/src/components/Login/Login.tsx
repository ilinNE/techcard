import React, { FC, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";

interface DishesProps {
  setLoggedIn: React.Dispatch<SetStateAction<boolean>>;
}

const Login: FC<DishesProps> = ({ setLoggedIn }) => {
  const navigate = useNavigate();
  const fastLogin = () => {
    setLoggedIn(true);
    navigate("/disches");
  };

  return (
    <div>
      <h1>Авторизация</h1>
      <button onClick={fastLogin}>Быстрая авторизация</button>
    </div>
  );
};

export default Login;
