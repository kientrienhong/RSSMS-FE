import axios from "axios";

export const getListRole = async (token) => {
  let user = await axios.get(`https://localhost:44304/api/v1/roles`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return user;
};

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
      `https://localhost:44304/api/v1/accounts?storageId=${storageId}&Name=${name}&page=${page}&size=${size}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } else {
    if (scheduleDay !== undefined && scheduleTime !== undefined) {
      listUser = await axios.get(
        `https://localhost:44304/api/v1/accounts?SheduleDay=${scheduleDay}&${scheduleTime}&page=${page}&size=${size}&RoleName=${roleName}&storageId=${storageId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } else {
      listUser = await axios.get(
        `https://localhost:44304/api/v1/accounts?Name=${name}&page=${page}&size=${size}`,
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
    "https://localhost:44304/api/v1/accounts/login",
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
    "https://localhost:44304/api/v1/accounts/changepassword",
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
    `https://localhost:44304/api/v1/accounts`,

    {
      name: user.name,
      password: user.password,
      email: user.email,
      address: user.address,
      phone: user.phone,
      gender: user.gender,
      birthdate: new Date(user.birthdate).toISOString(),
      roleId: user.roleId,
      images: {
        file: user?.avatarLink === null ? null : user?.avatarLink.file,
      },
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return response;
};

export const deleteUser = async (id, token) => {
  const response = await axios.delete(
    `https://localhost:44304/api/v1/accounts/${id}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return response;
};

export const updateUser = async (user, id, imageUrl, token) => {
  let object;
  if (imageUrl === "") {
    object = {
      id: id,
      name: user.name,
      address: user.address,
      phone: user.phone,
      gender: user.gender,
      birthdate: new Date(user.birthdate).toISOString(),
      storageId: user.storageId,
      images: {
        url: user?.images?.url,
      },
    };
  } else {
    object = {
      id: id,
      name: user.name,
      address: user.address,
      phone: user.phone,
      gender: user.gender,
      birthdate: new Date(user.birthdate).toISOString(),
      storageId: user.storageId,
      image: {
        file: imageUrl,
      },
    };
  }

  const response = await axios.put(
    `https://localhost:44304/api/v1/accounts/${id}`,
    object,
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
      height: parseInt(storage.height),
      width: parseInt(storage.width),
      length: parseInt(storage.length),
      address: storage.address,
      status: 1,
      image: {
        file: storage.image.file,
      },
      listStaff: [],
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return response;
};

export const updateStorage = async (storage, id, imageUrl, token) => {
  let object;
  if (imageUrl === "") {
    object = {
      id: id,
      name: storage.name,
      managerId: null,
      status: 1,
      address: storage.address,
      height: parseInt(storage.height),
      width: parseInt(storage.width),
      length: parseInt(storage.length),
      storageId: null,
      image: {
        url: storage.image.url,
      },
      usage: 0,
    };
  } else {
    object = {
      id: id,
      name: storage.name,
      managerId: null,
      status: 1,
      address: storage.address,
      height: parseInt(storage.height),
      width: parseInt(storage.width),
      length: parseInt(storage.length),
      storageId: null,
      image: {
        file: imageUrl,
      },
      usage: 0,
    };
  }
  const response = await axios.put(
    `https://localhost:44304/api/v1/storages/${id}`,
    object,
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

export const createArea = async (storageId, name, description, type, token) => {
  const response = await axios.post(
    "https://localhost:44304/api/v1/areas",
    {
      name: name,
      storageId: parseInt(storageId),
      status: 1,
      type: type,
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

export const updateArea = async (id, name, description, type, token) => {
  const response = await axios.put(
    `https://localhost:44304/api/v1/areas/${id}`,
    {
      id: id,
      name: name,
      type: type,
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
  const boxesId = placingProducts.boxes.map((e) => {
    return {
      boxId: e.idBox,
      orderDetailId: e.idOrderDetail,
    };
  });

  const response = await axios.post(
    `https://localhost:44304/api/v1/box-order-details`,
    {
      orderId: placingProducts.orderId,
      boxes: boxesId,
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
          file: product.images[0].file,
        },
      ],
    },

    { headers: { Authorization: `Bearer ${token}` } }
  );

  return response;
};

export const updateProduct = async (product, id, imageUrl, token) => {
  let object;
  if (imageUrl === "") {
    object = {
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
          url: product.images[0].url,
        },
      ],
    };
  } else {
    object = {
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
          file: imageUrl,
        },
      ],
    };
  }
  const response = await axios.put(
    `https://localhost:44304/api/v1/products/${id}`,
    object,
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

export const getStaffRequest = async (name, page, size, type, token) => {
  const response = await axios.get(
    `https://localhost:44304/api/v1/requests?page=${page}&size=${size}&RequestTypes=0`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return response;
};

export const getCustomerRequest = async (name, page, size, token) => {
  const response = await axios.get(
    `https://localhost:44304/api/v1/requests?RequestTypes=1&RequestTypes=2&RequestTypes=3&page=${page}&size=${size}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return response;
};

export const getRequestToSchedule = async (dayFrom, dayTo, token) => {
  const response = await axios.get(
    `https://localhost:44304/api/v1/requests?FromDate=${dayFrom}&ToDate=${dayTo}&RequestTypes=2`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response;
};

export const updateNotification = async (listNotification, token) => {
  const response = await axios.put(
    `https://localhost:44304/api/v1/notifications`,
    {
      ids: listNotification,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return response;
};

export const updateIsPaidRequest = async (idRequest, token) => {
  const response = await axios.put(
    `https://localhost:44304/api/v1/requests/${idRequest.toString()}`,
    {
      id: idRequest,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return response;
};

export const getRequestDetail = async (id, token) => {
  const response = await axios.get(
    `https://localhost:44304/api/v1/requests/${id}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return response;
};
