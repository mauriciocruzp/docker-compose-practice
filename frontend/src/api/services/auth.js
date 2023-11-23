import { axiosInstance } from "../axios";

export const login = async (email, password) => {
  try {
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
      }
    };
    const response = await axiosInstance.post("/user/login", {
      email,
      password,
    }, { config });

    return response;
  } catch (error) {
    return error.response;
  }
}
