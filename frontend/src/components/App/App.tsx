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
import * as Api from "../../utils/Api";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { errorMessages } from "../../utils/textConstants";
import { ProtectedRoute } from "../HOC/ProtectedRoute";

function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState({});
  const [errorMesage, setErrorMesage] = useState<string>("");

  const contextValue = { currentUser, setCurrentUser };
  const { pathname } = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    Api.getUserInfo()
      .then((userData) => {
        setLoggedIn(true);
        setCurrentUser(userData);
      })
      .catch((err) => {
        setLoggedIn(false);
        setCurrentUser({});
      });
  }, [loggedIn]);

  const registration = (values: any) => {
    Api.register(values)
      .then(() => {
        navigate("/signin");
      })
      .catch(() => setErrorMesage(errorMessages.DuplicateEmail));
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
      .catch(() => setErrorMesage(errorMessages.BadEmailOrPassword));
  };

  const feedback = (values: any) => {
    Api.feedback(values)
      .then(() => setErrorMesage(errorMessages.SuccessFeedback))
      .catch(() => setErrorMesage(errorMessages.BadFeedback));
  };

  const handleloggedOutClick = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    navigate("/", { replace: false });
  };

  return (
    <CurrentUserContext.Provider value={contextValue}>
      <section className="App">
        {pathWithHeader.includes(pathname) && <Header loggedIn={loggedIn} />}

        <Routes>
          <Route
            path="/"
            element={
              <Main
                handleFeedback={feedback}
                errorMesage={errorMesage}
                setErrorMesage={setErrorMesage}
              />
            }
          />
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
              <Route
                path="/signup"
                element={
                  <Register
                    handleRegister={registration}
                    errorMesage={errorMesage}
                    setErrorMesage={setErrorMesage}
                  />
                }
              />
              <Route
                path="/signin"
                element={
                  <Login
                    handleAuthorize={authorization}
                    errorMesage={errorMesage}
                    setErrorMesage={setErrorMesage}
                  />
                }
              />
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
    </CurrentUserContext.Provider>
  );
}

export default App;
