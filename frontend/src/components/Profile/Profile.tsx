import { FC } from "react";
import "./Profile.scss";
import { IProfileProps } from "./IProfile";
import { useSelector } from "react-redux";

interface RootState {
  currentUser: any;
}

const Profile: FC<IProfileProps> = ({ handleloggedOutClick }) => {
  const { currentUser } = useSelector((state: RootState) => state.currentUser);

  return (
    <section>
      <h1>Профайл</h1>
      <p>{`Привет, ${currentUser.username}`}</p>
      <button onClick={handleloggedOutClick}>Выйти из аккаунта</button>
    </section>
  );
};

export default Profile;
