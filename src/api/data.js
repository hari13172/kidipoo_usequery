import axios from "axios";

const API_URL = "http://192.168.1.4:4000";

export const API = {
  data: () => getMethod(`${API_URL}/data`),
  dataId: (id) => getMethod(`${API_URL}/data/${id}`),
  addData: (bodyData) => postMethod(`${API_URL}/data`, bodyData),
};

const getMethod = async (url) => {
  try {
    const response = await axios
      .get(url)
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        console.log(err.response.data);
        throw new Error(err.response.data);
      });

    return response.data; // Return the response data
  } catch (error) {
    throw new Error(error.message); // Throw an error if the request fails
  }
};

const postMethod = async (url, data) => {
  try {
    const response = await axios.post(url, data);
    console.log(response);
    return response.data; // Return the response data
  } catch (error) {
    throw new Error(error.message); // Throw an error if the request fails
  }
};
