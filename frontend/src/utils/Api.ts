import axios from "axios";

export const getTest = async () => {
  try {
    return await axios
      .get("/api/hello/", {
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

export const postTest = async (data: string) => {
  try {
    return await axios
      .post("/api/hello/", data, {
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
