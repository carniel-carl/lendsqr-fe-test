import axios from "axios";
import { User } from "../types/types";
import { delay } from "../lib/utils";

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

// utils/fetchUserDetails.ts
// const fetchUserDetails = async (id: string | undefined): Promise<User> => {
//   const userDataFromStorage = localStorage.getItem("userLendsqr");
//   if (userDataFromStorage) {
//     const data = JSON.parse(userDataFromStorage);
//     if (data.id === id) {
//       return data;
//     } else {
//       throw new Error("User not found");
//     }
//   }
//   throw new Error("No user data");
// };

const fetchUserDetails = async (id: string): Promise<User | null> => {
  try {
    const userDataFromStorage = localStorage.getItem("userLendsqr");
    await delay(2);
    if (userDataFromStorage) {
      const data = JSON.parse(userDataFromStorage);
      if (data.id === id) {
        return data;
      }
    }
    return null;
  } catch (error) {
    console.error("Error fetching user details", error);
    return null;
  }
};

const logout = () => {
  localStorage.removeItem("loggedInUser:Lendqr");
  window.location.reload();
};

export { getUser, logout, fetchUserDetails };
