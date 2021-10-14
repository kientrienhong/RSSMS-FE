import axios from "axios";

export const getListUser = async (name, page, size, storageId) => {
  let listUser;
  if (storageId !== undefined) {
    listUser = await axios.get(
      `https://localhost:44304/api/v1/users?storageId=${storageId}&Name=${name}&page=${page}&size=${size}`
    );
  } else {
    listUser = await axios.get(
      `https://localhost:44304/api/v1/users?Name=${name}&page=${page}&size=${size}`
    );
  }

  return listUser;
};

export const login = async (email, password) => {
  const response = await axios.post(
    "https://localhost:44304/api/v1/users/login",
    {
      email: email,
      password: password,
    }
  );

  return response;
};

export const changePassword = async (id, password, confirmPassword) => {
  const response = await axios.post(
    "https://localhost:44304/api/v1/users/changepassword",
    {
      id: id,
      password: password,
      confirmPassword: confirmPassword,
    }
  );

  return response;
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
        url: null,
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
    if (user.images === undefined) {
      image = null;
    } else {
      image = user.images[0].url;
    }
  } else {
    image = imageUrl;
  }

  const response = await axios.put(
    `https://localhost:44304/api/v1/users/${id}`,
    {
      id: id,
      name: user.name,
      address: user.address,
      phone: user.phone,
      storageId: user.storageId,
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

export const getListStorage = async (name, page, size) => {
  const listStorage = await axios.get(
    `https://localhost:44304/api/v1/storages?Name=${name}&page=${page}&size=${size}`
  );

  return listStorage;
};

export const getStorageDetail = async (id) => {
  const storage = await axios.get(
    `https://localhost:44304/api/v1/storages/${id}`
  );

  return storage;
};

export const createStorage = async (storage) => {
  const response = await axios.post(`https://localhost:44304/api/v1/storages`, {
    name: storage.name,
    size: storage.size,
    address: storage.address,
    status: 1,
    type: storage.type,
    images: [
      {
        url: null,
      },
    ],
    listStaff: [],
  });

  return response;
};

export const updateStorage = async (storage, id, imageUrl) => {
  let image;
  if (imageUrl === "") {
    if (storage.images === undefined) {
      image = null;
    } else {
      image = storage.images[0].url;
    }
  } else {
    image = imageUrl;
  }

  const response = await axios.put(
    `https://localhost:44304/api/v1/storages/${id}`,
    {
      id: id,
      name: storage.name,
      managerId: null,
      status: 1,
      address: storage.address,
      size: storage.size,
      storageId: null,
      images: [
        {
          id: storage.images[0].id,
          url: image,
        },
      ],
      usage: 0,
      type: storage.type,
    }
  );

  return response;
};
export const deleteStorage = async (id) => {
  const response = await axios.delete(
    `https://localhost:44304/api/v1/storages/${id}`
  );

  return response;
};

export const assignListStaffToStorage = async (
  listAssigned,
  listUnassigned,
  storage
) => {
  listAssigned = listAssigned.map((e) => {
    return { userId: e.id, roleName: e.roleName };
  });
  listUnassigned = listUnassigned.map((e) => {
    return { userId: e.id, roleName: e.roleName };
  });

  const response = await axios.put(
    "https://localhost:44304/api/v1/staff-manage-storages/assign-staff",
    {
      storageId: storage.id,
      storageName: storage.name,
      userAssigned: listAssigned,
      userUnAssigned: listUnassigned,
    }
  );

  return response;
};

export const getArea = async (storageId) => {
  const response = await axios.get(
    `https://localhost:44304/api/v1/areas?storageid=${storageId}&page=1&size=-1`
  );

  return response;
};

export const createArea = async (storageId, name) => {
  console.log({
    name: name,
    storageId: storageId,
    status: 1,
  });
  const response = await axios.post("https://localhost:44304/api/v1/areas", {
    name: name,
    storageId: parseInt(storageId),
    status: 1,
  });

  return response;
};

export const deleteArea = async (id) => {
  const response = await axios.delete(
    `https://localhost:44304/api/v1/areas/${id}`
  );

  return response;
};

export const updateArea = async (id, name) => {
  console.log(id, name);
  const response = await axios.put(
    `https://localhost:44304/api/v1/areas/${id}`,
    {
      id: id,
      name: name,
    }
  );

  return response;
};

export const getListShelves = async (name, page, size, areaId) => {
  let listShelves;
  listShelves = await axios.get(
    `https://localhost:44304/api/v1/shelves?AreaId=${areaId}&page=${page}&size=${size}`
  );

  return listShelves;
};

export const createShelf = async (shelf, areaId) => {
  let listShelves = await axios.post(`https://localhost:44304/api/v1/shelves`, {
    areaId: areaId,
    type: shelf.type,
    name: shelf.name,
    note: shelf.note,
    boxesInWidth: shelf.boxesInWidth,
    boxesInHeight: shelf.boxesInHeight,
    boxSize: shelf.boxSize,
  });

  return listShelves;
};

export const updateShelf = async (id, shelf) => {
  let listShelves = await axios.put(
    `https://localhost:44304/api/v1/shelves/${id}`,
    {
      id: id,
      type: shelf.type,
      name: shelf.name,
      note: shelf.note,
      boxesInWidth: shelf.boxesInWidth,
      boxesInHeight: shelf.boxesInHeight,
    }
    // boxSize: shelf.boxSize,
  );

  return listShelves;
};

export const deleteShelf = async (id) => {
  const response = await axios.delete(
    `https://localhost:44304/api/v1/shelves/${id}`
  );

  return response;
};
