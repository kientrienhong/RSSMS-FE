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

export const updateUser = async (user, id, imageUrl) => {
  let image;
  if (imageUrl === "") {
    console.log(user.images);
    if (user.images === undefined) {
      image = null;
    } else {
      image = user.images[0].url;
    }
  } else {
    image = imageUrl;
  }
  console.log("=============", image);
  const response = await axios.put(
    `https://localhost:44304/api/v1/users/${id}`,
    {
      id: id,
      name: user.name,
      address: user.address,
      phone: user.phone,
      storageId: null,
      images: [
        {
          id: user.images[0].id,
          url: image,
        },
      ],
    }
  );

  return response;
};
