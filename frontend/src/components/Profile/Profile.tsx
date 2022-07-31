import { FC, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.scss";

interface DishesProps {
  setLoggedIn: React.Dispatch<SetStateAction<boolean>>;
}

const Profile: FC<DishesProps> = ({ setLoggedIn }) => {
  const navigate = useNavigate();
  const fastLogout = () => {
    setLoggedIn(false);
    navigate("/");
  };

  return (
    <section>
      <h1>Профайл</h1>
      <button onClick={fastLogout}>Выйти из аккаунта</button>
    </section>
  );
};

export default Profile;
