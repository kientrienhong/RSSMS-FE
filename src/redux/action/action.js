import * as ActionType from "./../constants/ActionType";

export const showLoader = () => {
  return {
    type: ActionType.SHOW_LOADER,
  };
};

export const hideLoader = () => {
  return {
    type: ActionType.HIDE_LOADER,
  };
};

export const showSnackbar = (type, msg) => {
  return {
    type: ActionType.SHOW_SNACKBAR,
    payload: { type, msg },
  };
};

export const hideSnackbar = () => {
  return {
    type: ActionType.HIDE_SNACKBAR,
  };
};

export const setUpUser = (user) => {
  return {
    type: ActionType.SET_UP_USER,
    payload: user,
  };
};

export const setUpOrder = (order) => {
  return {
    type: ActionType.SET_UP_ORDER,
    payload: order,
  };
};

export const storeOrder = (order) => {
  return {
    type: ActionType.STORE_ORDER,
    payload: order,
  };
};

export const openStoredOrderModal = (isView) => {
  return {
    type: ActionType.OPEN_ORDER_MODAL,
    payload: isView,
  };
};

export const closeStoredOrderModal = () => {
  return {
    type: ActionType.CLOSE_ORDER_MODAL,
  };
};

export const setUpCurrentBox = (box) => {
  return {
    type: ActionType.SET_CURRENT_BOX,
    payload: box,
  };
};

export const placeProductToShelf = (product) => {
  return {
    type: ActionType.PLACE_PRODUCT_TO_SHELF,
    payload: product,
  };
};

export const placeStorage = (storage) => {
  return {
    type: ActionType.PLACING_STORAGE,
    payload: storage,
  };
};

export const removeStorage = (storage) => {
  return {
    type: ActionType.REMOVE_PLACING_STORAGE,
    payload: storage,
  };
};

export const setUpCurrentStorage = (storage) => {
  return {
    type: ActionType.SET_UP_CURRENT_STORAGE,
    payload: storage,
  };
};

export const removePlacedProduct = (product) => {
  return {
    type: ActionType.REMOVE_PLACED_PRODUCT,
    payload: product,
  };
};

export const emptyPlacedProduct = () => {
  return {
    type: ActionType.EMPTY_PRODUCT,
  };
};

export const changeIsLoadShelf = () => {
  return {
    type: ActionType.CHANGE_IS_LOAD_SHELF,
  };
};

export const changeIsLoadStorage = () => {
  return {
    type: ActionType.CHANGE_IS_LOAD_STORAGE,
  };
};

export const changeIsLoadOrder = () => {
  return {
    type: ActionType.CHANGE_IS_LOAD_ORDER,
  };
};

export const setUpMoveBox = (box) => {
  return {
    type: ActionType.SET_UP_MOVE_BOX,
    payload: box,
  };
};

export const emptyMoveBox = () => {
  return {
    type: ActionType.EMPTY_MOVE_BOX,
  };
};

export const cancelStoreOrder = () => {
  return {
    type: ActionType.CANCEL_STORE_ORDER,
  };
};

export const setUpNotification = (notifcation) => {
  return {
    type: ActionType.SET_UP_NOTIFICATIONS,
    payload: notifcation,
  };
};

export const setUpIsReadNoti = () => {
  return {
    type: ActionType.SET_UP_IS_READ_NOTI,
  };
};

export const addNotification = (notifcation) => {
  return {
    type: ActionType.ADD_NOTIFICATIONS,
    payload: notifcation,
  };
};

export const setUpCurrentViewOrderId = (orderId) => {
  return {
    type: ActionType.SET_CURRENT_VIEW_ORDER_ID,
    payload: orderId,
  };
};

export const changeIsLoadRequest = () => {
  return {
    type: ActionType.CHANGE_IS_LOAD_REQUEST,
  };
};

export const handleProgressModal = (isOpen, title, yesFunction, noFunction) => {
  return {
    type: ActionType.HANDLE_PROGRESS_MODAL,
    payload: {
      isOpen,
      title,
      yesFunction,
      noFunction,
    },
  };
};

export const setUpCurrentFloor = (floor) => {
  return {
    type: ActionType.SET_UP_CURRENT_FLOOR,
    payload: floor,
  };
};

export const changeMoveOrderDetail = () => {
  return {
    type: ActionType.CHANGE_MOVE_ORDER_DETAIL,
  };
};

export const addMovingProduct = (orderDetail, oldFloorId) => {
  return {
    type: ActionType.ADD_MOVING_PRODUCT,
    payload: {
      orderDetail: orderDetail,
      oldFloorId: oldFloorId,
    },
  };
};

export const placeMovingProduct = (orderDetail, newFloorId) => {
  return {
    type: ActionType.PLACING_MOVING_PRODUCT,
    payload: {
      orderDetail: orderDetail,
      newFloorId: newFloorId,
    },
  };
};
