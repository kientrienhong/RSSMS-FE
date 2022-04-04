import * as ActionType from "./../constants/ActionType";

const initialState = {
  order: {},
  storedOrder: {
    orderId: -1,
    products: [],
    totalQuantity: 0,
  },
  currentFloor: {},
  currentBox: {},
  currentStorage: {},
  placingProducts: {
    typeOrder: -1,
    orderId: -1,
    floors: [],
  },
  isLoadingShelf: false,
  isLoadingStorage: false,
  isLoadingRequest: false,
  isLoadingOrder: false,
  moveBox: undefined,

  isMoveOrderDetail: false,
  currentPositionViewOrderId: -1,
};

const order = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_UP_ORDER: {
      state.order = action.payload;
      return {...state};
    }

    case ActionType.STORE_ORDER: {
      let storedOrderTemp = {...state.storedOrder};
      let placingProductsTemp = {
        orderId: -1,
        floors: [],
        typeOrder: action.payload.typeOrder,
      };
      storedOrderTemp.products = action.payload.orderDetails.filter((e) => {
        if (e.serviceType === 0 || e.serviceType === 2 || e.serviceType === 4) {
          return e;
        }
      });
      storedOrderTemp.orderId = action.payload.id;

      let quantity = 0;
      storedOrderTemp.products.forEach((e) => {
        quantity++;
      });

      storedOrderTemp.totalQuantity = quantity;
      return {
        ...state,
        storedOrder: storedOrderTemp,
        placingProducts: placingProductsTemp,
        order: action.payload,
      };
    }

    case ActionType.ADD_MOVING_PRODUCT: {
      let storedOrderTemp = {...state.storedOrder};
      storedOrderTemp.orderId = 1;
      storedOrderTemp.products.push({
        ...action.payload.orderDetail,
        oldFloorId: action.payload.oldFloorId,
      });
      storedOrderTemp.totalQuantity++;
      return {
        ...state,
        storedOrder: storedOrderTemp,
        isMoveOrderDetail: true,
      };
    }

    case ActionType.SET_UP_CURRENT_FLOOR: {
      state.currentFloor = action.payload;
      return {...state};
    }

    case ActionType.SET_CURRENT_BOX: {
      state.currentBox = action.payload;
      return {...state};
    }

    case ActionType.CHANGE_IS_LOAD_SHELF: {
      state.isLoadingShelf = !state.isLoadingShelf;
      return {...state};
    }

    case ActionType.CHANGE_IS_LOAD_STORAGE: {
      state.isLoadingStorage = !state.isLoadingStorage;
      return {...state};
    }

    case ActionType.CHANGE_IS_LOAD_ORDER: {
      state.isLoadingOrder = !state.isLoadingOrder;
      return {...state};
    }

    case ActionType.EMPTY_PRODUCT: {
      state.storedOrder = {
        orderId: -1,
        products: [],
        totalQuantity: 0,
      };
      state.placingProducts = {
        orderId: -1,
        floors: [],
        typeOrder: -1,
      };
      state.isMoveOrderDetail = false;
      return {...state};
    }

    case ActionType.CHANGE_IS_LOAD_REQUEST: {
      state.isLoadingRequest = !state.isLoadingRequest;
      return {...state};
    }

    case ActionType.SET_CURRENT_VIEW_ORDER_ID: {
      state.currentPositionViewOrderId = action.payload;
      return {...state};
    }

    case ActionType.PLACE_PRODUCT_TO_SHELF: {
      let placingProductTemp = {...state.placingProducts};
      let storedOrderTemp = {...state.storedOrder};

      let foundProduct = storedOrderTemp.products.find((e) => {
        return e.id.toString() == action.payload.idOrderDetail;
      });
      foundProduct.amount--;
      foundProduct.isPlaced = true;
      storedOrderTemp.totalQuantity--;
      let customerName = "";
      let customerPhone = "";
      let orderName = "";
      let returnDate = "";
      if (state.isMoveOrderDetail) {
        customerName = foundProduct.customerName;
        customerPhone = foundProduct.customerPhone;
        orderName = foundProduct.orderName;
        returnDate = foundProduct.returnDate;
      } else {
        customerName = state.order.customerName;
        customerPhone = state.order.customerPhone;
        orderName = state.order.name;
        returnDate = state.order.returnDate;
      }

      placingProductTemp.orderId = storedOrderTemp.orderId;
      placingProductTemp.floors.push({
        idItemPlacing: placingProductTemp.floors.length,
        areaName: state.currentFloor.areaName,
        shelfName: state.currentFloor.shelfName,
        floorName: state.currentFloor.name,
        floorId: state.currentFloor.id,
        storageName: state.currentFloor.storageName,
        areaId: state.currentFloor.areaId,
        width: action.payload.infoProduct.width,
        length: action.payload.infoProduct.length,
        height: action.payload.infoProduct.height,
        storageId: state.currentFloor.storageId,
        nameProduct: action.payload.nameProduct,
        orderStatus: 1,
        idOrderDetail: action.payload.idOrderDetail,
        oldFloorId: foundProduct.oldFloorId,
        images: foundProduct.images,
        customerName: customerName,
        customerPhone: customerPhone,
        orderName: orderName,
        returnDate: returnDate,
      });
      return {
        ...state,
        placingProducts: placingProductTemp,
        storedOrder: storedOrderTemp,
      };
    }

    case ActionType.CHANGE_MOVE_ORDER_DETAIL: {
      state.isMoveOrderDetail = !state.isMoveOrderDetail;
      return {...state};
    }

    case ActionType.REMOVE_PLACED_PRODUCT: {
      let placingProductTemp = {...state.placingProducts};
      let storedOrderTemp = {...state.storedOrder};
      let foundProduct = storedOrderTemp.products.find(
        (e) => e.id.toString() === action.payload.idOrderDetail
      );
      foundProduct.amount += 1;
      storedOrderTemp.totalQuantity++;
      foundProduct.isPlaced = false;

      let indexCurrentProduct = placingProductTemp.floors.findIndex(
        (e) => e.idItemPlacing === action.payload.idItemPlacing
      );
      placingProductTemp.floors.splice(indexCurrentProduct, 1);
      placingProductTemp.floors.forEach((e, index) => {
        e.idItemPlacing = index;
      });

      return {
        ...state,
        placingProducts: placingProductTemp,
        storedOrder: storedOrderTemp,
      };
    }

    case ActionType.SET_UP_MOVE_BOX: {
      state.moveBox = {
        orderId: action.payload.orderId,
        boxId: action.payload.id,
        newBoxId: 0,
        shelfType: action.payload.shelfType,
        sizeType: action.payload.sizeType,
      };
      return {...state};
    }

    case ActionType.EMPTY_MOVE_BOX: {
      state.moveBox = undefined;
      return {...state};
    }

    case ActionType.CANCEL_STORE_ORDER: {
      state.storedOrder = {
        orderId: -1,
        products: [],
        totalQuantity: 0,
      };
      state.placingProducts = {
        typeOrder: -1,
        orderId: -1,
        boxes: [],
      };

      state.order = {};
      return {...state};
    }

    case ActionType.REMOVE_PLACING_STORAGE: {
      let placingProductTemp = {...state.placingProducts};
      let storedOrderTemp = {...state.storedOrder};
      let indexCurrentProduct = placingProductTemp.boxes.findIndex(
        (e) => e.idStorage === action.payload.id
      );
      let foundProduct = storedOrderTemp.products.find(
        (e) =>
          e.productId.toString() ===
          placingProductTemp.boxes[indexCurrentProduct].idProduct
      );
      foundProduct.amount += 1;
      storedOrderTemp.totalQuantity++;

      placingProductTemp.boxes.splice(indexCurrentProduct, 1);
      placingProductTemp.boxes.forEach((e, index) => {
        e.idItemPlacing = index;
      });

      return {
        ...state,
        placingProducts: placingProductTemp,
        storedOrder: storedOrderTemp,
      };
    }

    case ActionType.SET_UP_CURRENT_STORAGE: {
      state.currentStorage = action.payload;
      return {...state};
    }

    case ActionType.PLACING_STORAGE: {
      let placingProductTemp = {...state.placingProducts};
      let storedOrderTemp = {...state.storedOrder};
      let foundProduct = storedOrderTemp.products.find((e) => {
        return e.productId.toString() === action.payload.idProduct;
      });
      foundProduct.amount--;
      storedOrderTemp.totalQuantity--;
      placingProductTemp.orderId = storedOrderTemp.orderId;
      placingProductTemp.boxes.push({
        idProduct: action.payload.idProduct,
        idItemPlacing: placingProductTemp.boxes.length,
        storageName: state.currentStorage.name,
        idStorage: state.currentStorage.id,
        nameProduct: action.payload.nameProduct,
      });
      return {
        ...state,
        placingProducts: placingProductTemp,
        storedOrder: storedOrderTemp,
      };
    }

    default: {
      return {...state};
    }
  }
};

export default order;
