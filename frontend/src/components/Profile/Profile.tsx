import { FC, useContext } from "react";
import "./Profile.scss";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { IProfileProps } from "./IProfile";

const Profile: FC<IProfileProps> = ({ handleloggedOutClick }) => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  return (
    <section>
      <h1>Профайл</h1>
      <p>{`Привет, ${currentUser.username}`}</p>
      <button onClick={handleloggedOutClick}>Выйти из аккаунта</button>
    </section>
  );
};

export default Profile;
