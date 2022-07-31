import axios from "axios";

export const register = async (data: string) => {
  try {
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
  } catch (error) {
    console.error(error);
  }
};
