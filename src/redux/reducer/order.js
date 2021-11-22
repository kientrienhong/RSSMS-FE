import * as ActionType from "./../constants/ActionType";

const initialState = {
  order: {},
  storedOrder: {
    orderId: -1,
    products: [],
    totalQuantity: 0,
  },
  currentBox: {},
  currentStorage: {},
  placingProducts: {
    typeOrder: -1,
    orderId: -1,
    boxes: [],
  },
  isLoadingShelf: false,
  isLoadingStorage: false,
  moveBox: undefined,
};

const order = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_UP_ORDER: {
      state.order = action.payload;
      return { ...state };
    }

    case ActionType.STORE_ORDER: {
      let storedOrderTemp = { ...state.storedOrder };
      let placingProductsTemp = {
        orderId: -1,
        boxes: [],
        typeOrder: action.payload.typeOrder,
      };
      storedOrderTemp.products = action.payload.orderDetails.filter((e) => {
        if (e.productType === 0 || e.productType === 2 || e.productType === 4) {
          return e;
        }
      });
      storedOrderTemp.orderId = action.payload.id;

      let quantity = 0;
      storedOrderTemp.products.forEach((e) => {
        quantity += e.amount;
      });

      storedOrderTemp.totalQuantity = quantity;
      return {
        ...state,
        storedOrder: storedOrderTemp,
        placingProducts: placingProductsTemp,
      };
    }

    case ActionType.SET_CURRENT_BOX: {
      state.currentBox = action.payload;
      return { ...state };
    }

    case ActionType.CHANGE_IS_LOAD_SHELF: {
      state.isLoadingShelf = !state.isLoadingShelf;
      return { ...state };
    }

    case ActionType.CHANGE_IS_LOAD_STORAGE: {
      state.isLoadingStorage = !state.isLoadingStorage;
      return { ...state };
    }

    case ActionType.EMPTY_PRODUCT: {
      state.storedOrder = {
        orderId: -1,
        products: [],
        totalQuantity: 0,
      };
      state.placingProducts = {
        orderId: -1,
        boxes: [],
        typeOrder: -1,
      };
      return { ...state };
    }

    case ActionType.PLACE_PRODUCT_TO_SHELF: {
      let placingProductTemp = { ...state.placingProducts };
      let storedOrderTemp = { ...state.storedOrder };

      let foundProduct = storedOrderTemp.products.find(
        (e) => e.productId.toString() === action.payload.idProduct
      );
      console.log(state.currentBox.nameBox);

      foundProduct.amount--;
      storedOrderTemp.totalQuantity--;
      placingProductTemp.orderId = storedOrderTemp.orderId;
      placingProductTemp.boxes.push({
        idItemPlacing: placingProductTemp.boxes.length,
        areaName: state.currentBox.areaName,
        idProduct: action.payload.idProduct,
        shelfName: state.currentBox.shelfName,
        nameBox: state.currentBox.nameBox,
        storageName: state.currentBox.storageName,
        areaId: state.currentBox.areaId,
        storageId: state.currentBox.storageId,
        idBox: state.currentBox.id,
        nameProduct: action.payload.nameProduct,
      });
      return {
        ...state,
        placingProducts: placingProductTemp,
        storedOrder: storedOrderTemp,
      };
    }

    case ActionType.REMOVE_PLACED_PRODUCT: {
      let placingProductTemp = { ...state.placingProducts };
      let storedOrderTemp = { ...state.storedOrder };
      let foundProduct = storedOrderTemp.products.find(
        (e) => e.productId.toString() === action.payload.idProduct
      );
      foundProduct.amount += 1;
      storedOrderTemp.totalQuantity++;

      let indexCurrentProduct = placingProductTemp.boxes.findIndex(
        (e) => e.idItemPlacing === action.payload.idItemPlacing
      );
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

    case ActionType.SET_UP_MOVE_BOX: {
      console.log(action.payload);
      state.moveBox = {
        orderId: action.payload.orderId,
        boxId: action.payload.id,
        newBoxId: 0,
        shelfType: action.payload.shelfType,
        sizeType: action.payload.sizeType,
      };
      return { ...state };
    }

    case ActionType.EMPTY_MOVE_BOX: {
      state.moveBox = undefined;
      return { ...state };
    }

    case ActionType.REMOVE_PLACING_STORAGE: {
      let placingProductTemp = { ...state.placingProducts };
      let storedOrderTemp = { ...state.storedOrder };
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
      return { ...state };
    }

    case ActionType.PLACING_STORAGE: {
      let placingProductTemp = { ...state.placingProducts };
      let storedOrderTemp = { ...state.storedOrder };
      console.log(action.payload);
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
      return { ...state };
    }
  }
};

export default order;
