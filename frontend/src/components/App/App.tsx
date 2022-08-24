import { useEffect, useState } from "react";
import "./App.scss";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Dishes from "../Dishes/Dishes";
import Main from "../Main/Main";
import Semis from "../Semis/Semis";
import Foodstuff from "../Foodstuff/Foodstuff";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Guide from "../Guide/Guide";
import ErrorPage from "../ErrorPage/ErrorPage";
import Header from "../Header/Header";
import { pathWithHeader } from "../../utils/constants";
import * as Api from "../../utils/Api/Api";
import * as ApiTypes from "../../utils/Api/ApiTypes";
import { errorMessages } from "../../utils/textConstants";
import { ProtectedRoute } from "../HOC/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../store/asyncActions/currentUser";
import { addMessage } from "../store/reducers/popupMessageReducer";
import { clearCurrentUser, getCurrentUserError } from "../store/reducers/currentUserReducer";

interface RootState {
  isLoading: boolean;
}

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.isLoading);

  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUser())
      .then(() => {
        setLoggedIn(true);
      })
      .catch(() => {
        dispatch(getCurrentUserError());
        setLoggedIn(false);
      });
  }, [loggedIn]);

  const registration = (values: any) => {
    Api.register(values)
      .then(() => {
        navigate("/signin");
      })
      .catch(() => {
        dispatch(addMessage(errorMessages.DuplicateEmail));
      });
  };

  const authorization = (values: any) => {
    Api.authorize(values)
      .then((data) => {
        if (data.access) {
          localStorage.setItem("token", data.access);
          setLoggedIn(true);
          navigate("/dishes");
        }
      })
      .catch(() => {
        dispatch(addMessage(errorMessages.BadEmailOrPassword));
      });
  };

  const feedback = (values: ApiTypes.FeedbackParams) => {
    Api.feedback(values)
      .then(() => {
        dispatch(addMessage(errorMessages.SuccessFeedback));
      })
      .catch(() => {
        dispatch(addMessage(errorMessages.BadFeedback));
      });
  };

  const handleloggedOutClick = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    dispatch(clearCurrentUser({}));
    navigate("/", { replace: false });
  };

  if (isLoading) {
    return <div>Загрузка данных</div>;
  }

  return (
    <section className="App">
      {pathWithHeader.includes(pathname) && <Header loggedIn={loggedIn} />}

      <Routes>
        <Route path="/" element={<Main handleFeedback={feedback} />} />
        <Route
          path="/dishes"
          element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Dishes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/semis"
          element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Semis />
            </ProtectedRoute>
          }
        />
        <Route
          path="/foodstuff"
          element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Foodstuff />
            </ProtectedRoute>
          }
        />
        {loggedIn ? (
          <>
            <Route path="/signup" element={<Navigate replace to="/dishes" />} />
            <Route path="/signin" element={<Navigate replace to="/dishes" />} />
          </>
        ) : (
          <>
            <Route path="/signup" element={<Register handleRegister={registration} />} />
            <Route path="/signin" element={<Login handleAuthorize={authorization} />} />
          </>
        )}

        <Route
          path="/profile"
          element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Profile handleloggedOutClick={handleloggedOutClick} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/guide"
          element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Guide />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </section>
  );
}

export default App;
