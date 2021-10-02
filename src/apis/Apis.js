import callApi from "./callApi";
import axios from "axios";

export const getListUser = async (name, page, size) => {
  const listUser = await axios.get(
    `https://localhost:44304/api/v1/users?&Name=${name}&page=${page}&size=${size}`
  );

  return listUser;
};
