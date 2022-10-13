import { useEffect, useState } from "react";
import "./App.scss";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import TechCards from "../TechCards/TechCards";
import Main from "../Main/Main";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Guide from "../Guide/Guide";
import { ErrorPage } from "../ErrorPage/ErrorPage";
import Header from "../Header/Header";
import { pathWithHeader } from "../../utils/constants";
import * as Api from "../../utils/Api/Api";
import * as ApiTypes from "../../utils/Api/ApiTypes";
import { errorMessages } from "../../utils/textConstants";
import { ProtectedRoute } from "../HOC/ProtectedRoute";
import { useDispatch } from "react-redux";
import { getUser } from "../store/asyncActions/currentUser";
import { addMessage } from "../store/reducers/popupMessageReducer";
import { clearCurrentUser } from "../store/reducers/currentUserReducer";
import WorkPlace from "../WorkPlace/WorkPlace";
import Footer from "../Footer/Footer";
import { TechCardContent } from "../TechCardContent/TechCardContent";

function App() {
  const dispatch = useDispatch();
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isOpenSideMenu, setIsOpenSideMenu] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getUser())
      .then(() => {
        setLoggedIn(true);
      })
      .catch(() => setLoggedIn(false));
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

  return (
    <section className="App">
      {pathWithHeader.includes(pathname) && <Header loggedIn={loggedIn} />}

      <Routes>
        <Route path="/" element={<Main handleFeedback={feedback} />} />
        <Route
          path="/techcards/"
          element={
            // <ProtectedRoute loggedIn={loggedIn}>
            <WorkPlace setIsOpenSideMenu={setIsOpenSideMenu} isOpenSideMenu={isOpenSideMenu} />
            // </ProtectedRoute>
          }
        >
          <Route
            path="dishes"
            element={<TechCards isOpenSideMenu={isOpenSideMenu} title={"Блюда"} />}
          />
          <Route path="dishes/:id" element={<TechCardContent isOpenSideMenu={isOpenSideMenu} />} />
          <Route
            path="semis"
            element={<TechCards isOpenSideMenu={isOpenSideMenu} title={"Полуфабрикаты"} />}
          />
          <Route path="semis/:id" element={<TechCardContent isOpenSideMenu={isOpenSideMenu} />} />
          <Route path="foodstuff" element={<TechCards isOpenSideMenu={isOpenSideMenu} title={"Продукты"} />} />
        </Route>
        {loggedIn ? (
          <>
            <Route path="/signup" element={<Navigate replace to="/techcards" />} />
            <Route path="/signin" element={<Navigate replace to="/techcards" />} />
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
              <Profile handleloggedOutClick={handleloggedOutClick} />
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
      {pathname === "/" && <Footer />}
    </section>
  );
}

export default App;
