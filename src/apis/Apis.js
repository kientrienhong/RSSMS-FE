import callApi from "./callApi";
import axios from "axios";

export const getListUser = async (name, page, size) => {
  const listUser = await axios.get(
    `https://localhost:44304/api/v1/users?&Name=${name}&page=${page}&size=${size}`
  );

  return listUser;
};

export const createUser = async (user) => {
  const response = await axios.post(`https://localhost:44304/api/v1/users`, {
    name: user.name,
    password: user.password,
    email: user.email,
    address: user.address,
    phone: user.phone,
    roleId: user.roleId,
    storageId: null,
    images: [
      {
        url: user.avatarLink,
      },
    ],
  });

  return response;
};

export const deleteUser = async (id) => {
  const response = await axios.delete(
    `https://localhost:44304/api/v1/users/${id}`
  );

  return response;
};
