import axios from "axios";

export const getListRole = async (token) => {
  let user = await axios.get(`https://localhost:44304/api/v1/roles`, {
    headers: {Authorization: `Bearer ${token}`},
  });

  return user;
};

export const getListStaff = async (storageId, token) => {
  if (storageId) {
    return await axios.get(
      `https://localhost:44304/api/v1/accounts/staffs?storageId=${storageId}&getFromAllStorage=false`,
      {
        headers: {Authorization: `Bearer ${token}`},
      }
    );
  } else {
    return await axios.get(
      `https://localhost:44304/api/v1/accounts/staffs?getFromAllStorage=false`,
      {
        headers: {Authorization: `Bearer ${token}`},
      }
    );
  }
};

export const getListDeliveryStaff = async (
  storageId,
  scheduleDay,
  scheduleTime,
  roleName,
  token
) => {
  return await axios.get(
    `https://localhost:44304/api/v1/accounts/staffs?storageId=${storageId}&roleName=${roleName}&scheduleDay=${scheduleDay}&${scheduleTime}`,
    {
      headers: {Authorization: `Bearer ${token}`},
    }
  );
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
      {headers: {Authorization: `Bearer ${token}`}}
    );
  } else {
    if (scheduleDay !== undefined && scheduleTime !== undefined) {
      listUser = await axios.get(
        `https://localhost:44304/api/v1/accounts?SheduleDay=${scheduleDay}&${scheduleTime}&page=${page}&size=${size}&RoleName=${roleName}&storageId=${storageId}`,
        {headers: {Authorization: `Bearer ${token}`}}
      );
    } else {
      listUser = await axios.get(
        `https://localhost:44304/api/v1/accounts?Name=${name}&page=${page}&size=${size}`,
        {headers: {Authorization: `Bearer ${token}`}}
      );
    }
  }

  return listUser;
};

export const findUserByPhone = async (phone, token) => {
  let user = await axios.get(
    `https://localhost:44304/api/v1/accounts/account/${phone}`,
    {headers: {Authorization: `Bearer ${token}`}}
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
    {headers: {Authorization: `Bearer ${token}`}}
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
      image: {
        file: user?.avatarLink === null ? null : user?.avatarLink.file,
      },
    },
    {headers: {Authorization: `Bearer ${token}`}}
  );

  return response;
};

export const deleteUser = async (id, token) => {
  const response = await axios.delete(
    `https://localhost:44304/api/v1/accounts/${id}`,
    {headers: {Authorization: `Bearer ${token}`}}
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
    {headers: {Authorization: `Bearer ${token}`}}
  );

  return response;
};

export const getListStorage = async (name, page, size, token) => {
  const listStorage = await axios.get(
    `https://localhost:44304/api/v1/storages?Name=${name}&page=${page}&size=${size}`,
    {headers: {Authorization: `Bearer ${token}`}}
  );

  return listStorage;
};

export const getStorageDetail = async (id, token) => {
  const storage = await axios.get(
    `https://localhost:44304/api/v1/storages/${id}`,
    {headers: {Authorization: `Bearer ${token}`}}
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
    {headers: {Authorization: `Bearer ${token}`}}
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
    {headers: {Authorization: `Bearer ${token}`}}
  );

  return response;
};
export const deleteStorage = async (id, token) => {
  const response = await axios.delete(
    `https://localhost:44304/api/v1/storages/${id}`,
    {headers: {Authorization: `Bearer ${token}`}}
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
    return {userId: e.id, roleName: e.roleName};
  });
  listUnassigned = listUnassigned.map((e) => {
    return {userId: e.id, roleName: e.roleName};
  });

  const response = await axios.put(
    "https://localhost:44304/api/v1/storages/assign-staff-to-storage",
    {
      storageId: storage.id,
      storageName: storage.name,
      userAssigned: listAssigned,
      userUnAssigned: listUnassigned,
    },
    {headers: {Authorization: `Bearer ${token}`}}
  );

  return response;
};

export const getArea = async (storageId, token) => {
  const response = await axios.get(
    `https://localhost:44304/api/v1/areas?storageid=${storageId}&page=1&size=-1`,
    {headers: {Authorization: `Bearer ${token}`}}
  );

  return response;
};

export const createArea = async (
  storageId,
  name,
  description,
  type,
  size,
  token
) => {
  const response = await axios.post(
    "https://localhost:44304/api/v1/areas",
    {
      name: name,
      storageId: storageId,
      status: 1,
      type: type,
      width: size.width,
      height: size.height,
      length: size.length,
      description: description,
    },
    {headers: {Authorization: `Bearer ${token}`}}
  );

  return response;
};

export const deleteArea = async (id, token) => {
  const response = await axios.delete(
    `https://localhost:44304/api/v1/areas/${id}`,
    {headers: {Authorization: `Bearer ${token}`}}
  );

  return response;
};

export const updateArea = async (id, name, description, type, size, token) => {
  const response = await axios.put(
    `https://localhost:44304/api/v1/areas/${id}`,
    {
      id: id,
      name: name,
      type: type,
      width: size.width,
      height: size.height,
      length: size.length,
      description: description,
    },
    {headers: {Authorization: `Bearer ${token}`}}
  );

  return response;
};

export const getDetailArea = async (id, token) => {
  const response = await axios.get(
    `https://localhost:44304/api/v1/areas/${id}`,
    {headers: {Authorization: `Bearer ${token}`}}
  );

  return response;
};

export const getListSpace = async (name, page, size, areaId, token) => {
  let listSpace;
  listSpace = await axios.get(
    `https://localhost:44304/api/v1/spaces?AreaId=${areaId}&Name=${name}&page=${page}&size=${size}`,
    {headers: {Authorization: `Bearer ${token}`}}
  );

  return listSpace;
};

export const createSpace = async (space, areaId, token) => {
  console.log({
    floorWidth: space.floorWidth,
    floorLength: space.floorLength,
    floorHeight: space.floorHeight,
  });
  let result = await axios.post(
    `https://localhost:44304/api/v1/spaces`,
    {
      areaId: areaId,
      type: space.type,
      name: space.name,
      floorWidth: space.floorWidth,
      floorLength: space.floorLength,
      floorHeight: space.floorHeight,
      numberOfFloor: space.numberOfFloor ?? 1,
    },
    {headers: {Authorization: `Bearer ${token}`}}
  );

  return result;
};

export const updateShelf = async (id, space, token) => {
  let result = await axios.put(
    `https://localhost:44304/api/v1/spaces/${id}`,
    {
      id: id,
      type: space.type,
      name: space.name,
      numberOfFloor: space.numberOfFloor ?? 1,
      floorWidth: space.floorWidth,
      floorLength: space.floorLength,
      floorHeight: space.floorHeight,
    },
    {headers: {Authorization: `Bearer ${token}`}}
  );

  return result;
};

export const deleteSpace = async (id, token) => {
  const response = await axios.delete(
    `https://localhost:44304/api/v1/spaces/${id}`,
    {headers: {Authorization: `Bearer ${token}`}}
  );

  return response;
};

export const createOrder = async (order, token) => {
  const response = await axios.post(
    `https://localhost:44304/api/v1/requests`,
    {
      customerId: order.customerId,
      deliveryAddress: order.deliveryAddress,
      addressReturn: order.addressReturn,
      totalPrice: order.totalPrice,
      typeOrder: order.typeOrder,
      deliveryTime: order.deliveryTime,
      isPaid: order.isPaid,
      note: order.note,
      type: 1,
      returnDate: order.returnDate,
      paymentMethod: order.paymentMethod,
      isCustomerDelivery: order.isCustomerDelivery,
      deliveryDate: order.deliveryDate,
      requestDetails: order.listProduct,
    },
    {headers: {Authorization: `Bearer ${token}`}}
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
        {headers: {Authorization: `Bearer ${token}`}}
      );
    } else {
      response = await axios.get(
        `https://localhost:44304/api/v1/orders?OrderStatuses=${listFilterOrder}&dateFrom=${dateStart}&dateTo=${dateEnd}&page=1&size=-1`,
        {headers: {Authorization: `Bearer ${token}`}}
      );
    }
  } else {
    if (listFilterOrder === undefined) {
      response = await axios.get(
        `https://localhost:44304/api/v1/orders?Id=${id}&page=${page}&size=${size}`,
        {headers: {Authorization: `Bearer ${token}`}}
      );
    } else {
      console.log(
        `https://localhost:44304/api/v1/orders?OrderStatuses=${listFilterOrder}&Id=${id}&page=${page}&size=${size}`
      );
      response = await axios.get(
        `https://localhost:44304/api/v1/orders?OrderStatuses=${listFilterOrder}&Id=${id}&page=${page}&size=${size}`,
        {headers: {Authorization: `Bearer ${token}`}}
      );
    }
  }

  return response;
};

export const getSchedule = async (dateStart, dateEnd, token) => {
  let response = await axios.get(
    `https://localhost:44304/api/v1/schedules?DateFrom=${dateStart}&DateTo=${dateEnd}&page=1&size=-1`,
    {headers: {Authorization: `Bearer ${token}`}}
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
      scheduleDay: scheduleDay,
      schedules: listOrder,
      userIds: userIds,
    },
    {headers: {Authorization: `Bearer ${token}`}}
  );
  return response;
};

export const getOrderById = async (id, token) => {
  const response = await axios.get(
    `https://localhost:44304/api/v1/orders/${id}`,
    {headers: {Authorization: `Bearer ${token}`}}
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
    {headers: {Authorization: `Bearer ${token}`}}
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
    {headers: {Authorization: `Bearer ${token}`}}
  );

  return response;
};

export const updateStatusOrder = async (id, status, token) => {
  const response = await axios.put(
    `https://localhost:44304/api/v1/orders/${id}`,
    {
      id: id,
      status: status,
    },
    {headers: {Authorization: `Bearer ${token}`}}
  );

  return response;
};

export const placeBoxes = async (placingProducts, token) => {
  const boxesId = placingProducts.floors.map((e) => {
    return {
      floorId: e.floorId,
      orderDetailId: e.idOrderDetail,
      serviceType: e.serviceType,
    };
  });

  const response = await axios.post(
    `https://localhost:44304/api/v1/orders/assign to floor`,
    {
      orderDetailAssignFloor: boxesId,
    },
    {headers: {Authorization: `Bearer ${token}`}}
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
    {headers: {Authorization: `Bearer ${token}`}}
  );

  return response;
};

export const assignOrder = async (requestId, storageId, token) => {
  const response = await axios.post(
    `https://localhost:44304/api/v1/requests/assign order`,
    {
      requestId: requestId,
      storageId: storageId,
    },
    {headers: {Authorization: `Bearer ${token}`}}
  );

  return response;
};

export const getProduct = async (type, token) => {
  let response =
    type === undefined
      ? await axios.get(`https://localhost:44304/api/v1/services`, {
          headers: {Authorization: `Bearer ${token}`},
        })
      : await axios.get(
          `https://localhost:44304/api/v1/services?Type=${type}`,
          {headers: {Authorization: `Bearer ${token}`}}
        );

  return response;
};

export const createProduct = async (product, token) => {
  const response = await axios.post(
    `https://localhost:44304/api/v1/services`,
    {
      name: product.name,
      price: product.price,
      description: product.description,
      type: product.type,
      length: parseFloat(product.length),
      width: parseFloat(product.width),
      height: parseFloat(product.height),
      size: product.size,
      unit: product.unit,
      tooltip: product.tooltip,
      image: {
        file: product.image.file,
      },
    },

    {headers: {Authorization: `Bearer ${token}`}}
  );

  return response;
};

export const updateRequestWithNote = async (status, note, idRequest, token) => {
  const response = await axios.put(
    `https://localhost:44304/api/v1/requests/${idRequest}`,
    {
      id: idRequest,
      description: note,
      status: status,
    },
    {headers: {Authorization: `Bearer ${token}`}}
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
      length: parseInt(product.length),
      width: parseInt(product.width),
      height: parseInt(product.height),
      unit: product.unit,
      tooltip: product.tooltip,
      image: {
        url: product.image.url,
      },
    };
  } else {
    object = {
      id: id,
      name: product.name,
      price: product.price,
      description: product.description,
      type: product.type,
      length: parseInt(product.length),
      width: parseInt(product.width),
      height: parseInt(product.height),
      unit: product.unit,
      tooltip: product.tooltip,
      image: {
        file: imageUrl,
      },
    };
  }
  const response = await axios.put(
    `https://localhost:44304/api/v1/services/${id}`,
    object,
    {headers: {Authorization: `Bearer ${token}`}}
  );
  return response;
};

export const deleteProduct = async (id, token) => {
  const response = await axios.delete(
    `https://localhost:44304/api/v1/services/${id}`,
    {headers: {Authorization: `Bearer ${token}`}}
  );

  return response;
};

export const getNotifcations = async (id, token) => {
  const response = await axios.get(
    `https://localhost:44304/api/v1/notifications?userId=${id}&page=1&size=-1`,
    {headers: {Authorization: `Bearer ${token}`}}
  );

  return response;
};

export const getStaffRequest = async (name, page, size, type, token) => {
  const response = await axios.get(
    `https://localhost:44304/api/v1/requests?page=${page}&size=${size}&RequestTypes=0`,
    {headers: {Authorization: `Bearer ${token}`}}
  );

  return response;
};

export const getCustomerRequest = async (name, page, size, token, filter) => {
  // const response = await axios.get(
  //   `https://localhost:44304/api/v1/requests?RequestTypes=1&RequestTypes=2&RequestTypes=3&RequestTypes=4&page=${page}&size=${size}`,
  //   {headers: {Authorization: `Bearer ${token}`}}
  // );
  console.log(filter);
  let response;
  if (filter) {
    response = await axios.get(
      `https://localhost:44304/api/v1/requests?RequestStatus=${filter}&page=${page}&size=${size}`,
      {headers: {Authorization: `Bearer ${token}`}}
    );
  } else {
    response = await axios.get(
      `https://localhost:44304/api/v1/requests?page=${page}&size=${size}`,
      {headers: {Authorization: `Bearer ${token}`}}
    );
  }

  return response;
};

export const getRequestToSchedule = async (dayFrom, dayTo, token) => {
  const response = await axios.get(
    `https://localhost:44304/api/v1/requests?FromDate=${dayFrom}&ToDate=${dayTo}&RequestTypes=2&RequestTypes=4`,
    {headers: {Authorization: `Bearer ${token}`}}
  );
  return response;
};

export const getRequestToScheduleNew = async (dayFrom, dayTo, token) => {
  const response = await axios.get(
    `https://localhost:44304/api/v1/requests?FromDate=${dayFrom}&ToDate=${dayTo}&RequestTypes=1&RequestTypes=4`,
    {headers: {Authorization: `Bearer ${token}`}}
  );
  return response;
};

export const updateNotification = async (listNotification, token) => {
  const response = await axios.put(
    `https://localhost:44304/api/v1/notifications`,
    {
      ids: listNotification,
    },
    {headers: {Authorization: `Bearer ${token}`}}
  );

  return response;
};

export const updateIsPaidRequest = async (idRequest, isPaid, token) => {
  const response = await axios.put(
    `https://localhost:44304/api/v1/requests/${idRequest.toString()}`,
    {
      id: idRequest,
      isPaid: isPaid,
      status: 3,
    },
    {headers: {Authorization: `Bearer ${token}`}}
  );

  return response;
};

export const moveOrderDetail = async (listMoveBox, token) => {
  const response = await axios.put(
    `https://localhost:44304/api/v1/orders/assign to another floor`,
    {
      orderDetailAssignFloor: listMoveBox,
    },
    {headers: {Authorization: `Bearer ${token}`}}
  );

  return response;
};

export const getRequestDetail = async (id, token) => {
  const response = await axios.get(
    `https://localhost:44304/api/v1/requests/${id}`,
    {headers: {Authorization: `Bearer ${token}`}}
  );

  return response;
};

export const getDetailFloor = async (id, token) => {
  const response = await axios.get(
    `https://localhost:44304/api/v1/floors/${id}`,
    {headers: {Authorization: `Bearer ${token}`}}
  );

  return response;
};
