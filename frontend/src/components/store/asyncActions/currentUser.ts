import axios from "axios";
import { Dispatch } from "redux";
import { errorMessages } from "../../../utils/textConstants";
import {
  getCurrentUser,
  getCurrentUserError,
  getCurrentUserSuccess,
} from "../reducers/currentUserReducer";
import { addMessage } from "../reducers/popupMessageReducer";

export const getUser: any = () => {
  return async (dispatch: Dispatch) => {
    dispatch(getCurrentUser());
    await axios
      .get("/api/users/me/", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        dispatch(getCurrentUserSuccess(res.data));
      });
  };
};
