import axios from "axios";
import { FeedbackParams } from "./ApiTypes";

export const getUserInfo = async () => {
  return await axios
    .get("/api/users/me/", {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      return res.data;
    });
};

export const register = async (data: string) => {
  return await axios
    .post("/api/users/", data, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
    .then((res) => {
      return res.data;
    });
};

export const authorize = async (data: string) => {
  return await axios
    .post("/api/auth/jwt/create/", data, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
    .then((res) => {
      return res.data;
    });
};

export const feedback = async (data: FeedbackParams) => {
  return await axios
    .post("/api/send_mail/", data, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
    .then((res) => {
      return res.data;
    });
};
