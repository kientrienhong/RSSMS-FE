import axios from "axios";

export const getListUser = async (
  name,
  page,
  size,
  token,
  storageId,
  scheduleDay,
  scheduleTime,
  roleName
) => {
  let listUser;

  if (
    storageId !== undefined &&
    scheduleDay === undefined &&
    scheduleTime === undefined
  ) {
    listUser = await axios.get(
      `https://localhost:44304/api/v1/users?storageId=${storageId}&Name=${name}&page=${page}&size=${size}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } else {
    if (scheduleDay !== undefined && scheduleTime !== undefined) {
      listUser = await axios.get(
        `https://localhost:44304/api/v1/users?SheduleDay=${scheduleDay}&${scheduleTime}&page=${page}&size=${size}&RoleName=${roleName}&storageId=${storageId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } else {
      listUser = await axios.get(
        `https://localhost:44304/api/v1/users?Name=${name}&page=${page}&size=${size}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    }
  }

  return listUser;
};

export const findUserByPhone = async (phone, token) => {
  let user = await axios.get(
    `https://localhost:44304/api/v1/users/user/${phone}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return user;
};

export const login = async (email, password, tokenFirebase) => {
  const response = await axios.post(
    "https://localhost:44304/api/v1/users/login",
    {
      email: email,
      password: password,
      deviceToken: tokenFirebase,
    }
  );

  return response;
};

export const changePassword = async (
  id,
  oldPassword,
  password,
  confirmPassword,
  token
) => {
  const response = await axios.post(
    "https://localhost:44304/api/v1/users/changepassword",
    {
      id: id,
      oldPassword: oldPassword,
      password: password,
      confirmPassword: confirmPassword,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return response;
};

export const createUser = async (user, token) => {
  const response = await axios.post(
    `https://localhost:44304/api/v1/users`,

    {
      name: user.name,
      password: user.password,
      email: user.email,
      address: user.address,
      phone: user.phone,
      gender: user.gender,
      birthdate: new Date(user.birthdate).toISOString(),
      roleId: user.roleId,
      storageId: null,
      images: [
        {
          url: null,
        },
      ],
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return response;
};

export const deleteUser = async (id, token) => {
  const response = await axios.delete(
    `https://localhost:44304/api/v1/users/${id}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return response;
};

export const updateUser = async (user, id, imageUrl, token) => {
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
      gender: user.gender,
      birthdate: new Date(user.birthdate).toISOString(),
      storageId: user.storageId,
      images: [
        {
          id: user.images[0].id,
          url: image,
        },
      ],
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return response;
};

export const getListStorage = async (name, page, size, token) => {
  const listStorage = await axios.get(
    `https://localhost:44304/api/v1/storages?Name=${name}&page=${page}&size=${size}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return listStorage;
};

export const getStorageDetail = async (id, token) => {
  const storage = await axios.get(
    `https://localhost:44304/api/v1/storages/${id}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return storage;
};

export const createStorage = async (storage, token) => {
  const response = await axios.post(
    `https://localhost:44304/api/v1/storages`,
    {
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
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return response;
};

export const updateStorage = async (storage, id, imageUrl, token) => {
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
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return response;
};
export const deleteStorage = async (id, token) => {
  const response = await axios.delete(
    `https://localhost:44304/api/v1/storages/${id}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return response;
};

export const assignListStaffToStorage = async (
  listAssigned,
  listUnassigned,
  storage,
  token
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
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return response;
};

export const getArea = async (storageId, token) => {
  const response = await axios.get(
    `https://localhost:44304/api/v1/areas?storageid=${storageId}&page=1&size=-1`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return response;
};

export const createArea = async (storageId, name, description, token) => {
  const response = await axios.post(
    "https://localhost:44304/api/v1/areas",
    {
      name: name,
      storageId: parseInt(storageId),
      status: 1,
      description: description,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return response;
};

export const deleteArea = async (id, token) => {
  const response = await axios.delete(
    `https://localhost:44304/api/v1/areas/${id}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return response;
};

export const updateArea = async (id, name, description, token) => {
  const response = await axios.put(
    `https://localhost:44304/api/v1/areas/${id}`,
    {
      id: id,
      name: name,
      description: description,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return response;
};

export const getDetailArea = async (id, token) => {
  const response = await axios.get(
    `https://localhost:44304/api/v1/areas/${id}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return response;
};

export const getListShelves = async (name, page, size, areaId, token) => {
  let listShelves;
  listShelves = await axios.get(
    `https://localhost:44304/api/v1/shelves?AreaId=${areaId}&Name=${name}&page=${page}&size=${size}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return listShelves;
};

export const createShelf = async (shelf, areaId, token) => {
  let listShelves = await axios.post(
    `https://localhost:44304/api/v1/shelves`,
    {
      areaId: areaId,
      type: shelf.type,
      name: shelf.name,
      note: shelf.note,
      boxesInWidth: shelf.boxesInWidth,
      boxesInHeight: shelf.boxesInHeight,
      boxSize: -1,
      productId: shelf.productId,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return listShelves;
};

export const updateShelf = async (id, shelf, token) => {
  let listShelves = await axios.put(
    `https://localhost:44304/api/v1/shelves/${id}`,
    {
      id: id,
      type: shelf.type,
      name: shelf.name,
      note: shelf.note,
      boxesInWidth: shelf.boxesInWidth,
      boxesInHeight: shelf.boxesInHeight,
      boxSize: -1,
      productId: shelf.productId,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return listShelves;
};

export const deleteShelf = async (id, token) => {
  const response = await axios.delete(
    `https://localhost:44304/api/v1/shelves/${id}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return response;
};

export const createOrder = async (order, token) => {
  const response = await axios.post(
    `https://localhost:44304/api/v1/orders`,
    {
      customerId: order.customerId,
      deliveryAddress: order.deliveryAddress,
      addressReturn: order.addressReturn,
      totalPrice: order.totalPrice,
      typeOrder: order.typeOrder,
      deliveryTime: order.deliveryTime,
      isPaid: order.isPaid,
      paymentMethod: order.paymentMethod,
      isUserDelivery: order.isUserDelivery,
      deliveryDate: order.deliveryDate,
      duration: order.duration,
      listProduct: order.listProduct,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return response;
};

export const getOrder = async (
  id,
  page,
  size,
  dateStart,
  dateEnd,
  token,
  listFilterOrder
) => {
  let response;
  if (dateStart !== undefined && dateEnd !== undefined) {
    if (listFilterOrder === undefined) {
      response = await axios.get(
        `https://localhost:44304/api/v1/orders?dateFrom=${dateStart}&dateTo=${dateEnd}&page=1&size=-1`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } else {
      response = await axios.get(
        `https://localhost:44304/api/v1/orders?${listFilterOrder}&dateFrom=${dateStart}&dateTo=${dateEnd}&page=1&size=-1`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    }
  } else {
    response = await axios.get(
      `https://localhost:44304/api/v1/orders?Id=${id}&page=${page}&size=${size}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }

  return response;
};

export const getSchedule = async (dateStart, dateEnd, token) => {
  let response = await axios.get(
    `https://localhost:44304/api/v1/schedules?DateFrom=${dateStart}&DateTo=${dateEnd}&page=1&size=-1`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response;
};

export const assignSchedule = async (
  scheduleDay,
  listOrder,
  userIds,
  token
) => {
  let response = await axios.post(
    `https://localhost:44304/api/v1/schedules`,
    {
      sheduleDay: scheduleDay,
      schedules: listOrder,
      userIds: userIds,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response;
};

export const getOrderById = async (id, token) => {
  const response = await axios.get(
    `https://localhost:44304/api/v1/orders/${id}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return response;
};

export const cancelOrder = async (id, reason, token) => {
  const response = await axios.put(
    `https://localhost:44304/api/v1/orders/cancel/${id}`,
    {
      id: id,
      rejectedReason: reason,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return response;
};

export const updateOrder = async (id, order, token) => {
  const response = await axios.put(
    `https://localhost:44304/api/v1/orders/${id}`,
    {
      id: order.id,
      paymentMethod: order.paymentMethod,
      isUserDelivery: order.isUserDelivery,
      deliveryDate: order.deliveryDate,
      returnTime: order.returnTime,
      deliveryTime: order.deliveryTime,
      returnDate: order.returnDate,
      deliveryAddress: order.deliveryAddress,
      addressReturn: order.addressReturn,
      status: order.status,
      isPaid: order.isPaid,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return response;
};

export const placeBoxes = async (placingProducts, token) => {
  const boxesId = placingProducts.boxes.map((e) => e.idBox);
  const response = await axios.post(
    `https://localhost:44304/api/v1/orderboxdetails`,
    {
      orderId: placingProducts.orderId,
      boxesId: boxesId,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return response;
};

export const moveBoxApi = async (box, token) => {
  const response = await axios.put(
    `https://localhost:44304/api/v1/orderboxdetails`,
    {
      orderId: box.orderId,
      boxId: box.boxId,
      newBoxId: box.newBoxId,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return response;
};

export const assignOrder = async (orderId, storageId, token) => {
  const response = await axios.post(
    `https://localhost:44304/api/v1/orderstoragedetails`,
    {
      orderId: orderId,
      storageId: storageId,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return response;
};

export const getProduct = async (type, token) => {
  let response =
    type === undefined
      ? await axios.get(`https://localhost:44304/api/v1/products`, {
          headers: { Authorization: `Bearer ${token}` },
        })
      : await axios.get(
          `https://localhost:44304/api/v1/products?Type=${type}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

  return response;
};

export const createProduct = async (product, token) => {
  const response = await axios.post(
    `https://localhost:44304/api/v1/products`,
    {
      name: product.name,
      price: product.price,
      description: product.description,
      type: product.type,
      size: product.size,
      unit: product.unit,
      tooltip: product.tooltip,
      images: [
        {
          url: null,
        },
      ],
    },

    { headers: { Authorization: `Bearer ${token}` } }
  );

  return response;
};

export const updateProduct = async (product, id, imageUrl, token) => {
  let image;
  if (imageUrl === "") {
    if (product.images === undefined) {
      image = null;
    } else {
      image = product.images[0].url;
    }
  } else {
    image = imageUrl;
  }

  const response = await axios.put(
    `https://localhost:44304/api/v1/products/${id}`,
    {
      id: id,
      name: product.name,
      price: product.price,
      description: product.description,
      type: product.type,
      size: product.size,
      unit: product.unit,
      tooltip: product.tooltip,
      images: [
        {
          id: product.images[0].id,
          url: image,
        },
      ],
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return response;
};

export const deleteProduct = async (id, token) => {
  const response = await axios.delete(
    `https://localhost:44304/api/v1/products/${id}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return response;
};

export const getNotifcations = async (id, token) => {
  const response = await axios.get(
    `https://localhost:44304/api/v1/notifications?userId=${id}&page=1&size=-1`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return response;
};
