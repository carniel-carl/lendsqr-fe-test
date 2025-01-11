import axios from "axios";

const BASEURL = import.meta.env.VITE_API_ENDPOINT;
const TOKEN = import.meta.env.VITE_API_TOKEN;

// HDR: Get mock api data
const getUser = async () => {
  try {
    const res = await axios.get(BASEURL, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export { getUser };
