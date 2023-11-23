import { axiosInstance } from "../axios";

export async function create(
	name,
	email,
	password,
) {
	const config = {
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
		}
	};
	try {
		const response = await axiosInstance.post("/user/create", {
			name,
			email,
			password,
		}, {config});
		return response;
	} catch (error) {
		return error.response;
	}
}

export const update = async (monitorSerialNumber) => {
  try {
    const response = await axiosInstance.put("/user/monitor", {
      monitorSerialNumber,
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    return response;
  } catch (error) {
    return error.response;
  }
}
