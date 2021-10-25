import * as ActionType from "./../constants/ActionType";

const initialState = {
  order: {},
  storedOrder: {
    orderId: -1,
    products: [],
    totalQuantity: 0,
  },
  currentBox: {},
  placingProducts: {
    orderId: -1,
    boxes: [],
  },
};

const order = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_UP_ORDER: {
      state.order = action.payload;
      return { ...state };
    }

    case ActionType.STORE_ORDER: {
      let storedOrderTemp = { ...state.storedOrder };
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
      return { ...state, storedOrder: storedOrderTemp };
    }

    case ActionType.SET_CURRENT_BOX: {
      state.currentBox = action.payload;
      return { ...state };
    }

    case ActionType.PLACE_PRODUCT_TO_SHELF: {
      // state.placingProducts = action.payload;
      let placingProductTemp = { ...state.placingProducts };
      let storedOrderTemp = { ...state.storedOrder };

      let foundProduct = storedOrderTemp.products.find(
        (e) => e.productId.toString() === action.payload.idProduct
      );

      foundProduct.amount -= 1;
      placingProductTemp.orderId = storedOrderTemp.orderId;
      placingProductTemp.boxes.push({
        idItemPlacing: placingProductTemp.boxes.length,
        areaName: state.currentBox.areaName,
        storageName: state.currentBox.storageName,
        idBox: state.currentBox.id,
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
