import axios from "axios";
import { Dispatch } from "redux";
import { getCurrentUser } from "../reducers/currentUserReducer";

export const getUser: any = () => {
  return async (dispatch: Dispatch) => {
    await axios
      .get("/api/users/me/", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        dispatch(getCurrentUser(res.data));
      });
  };
};
