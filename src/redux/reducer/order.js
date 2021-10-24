import * as ActionType from "./../constants/ActionType";

const initialState = {
  order: {},
  storedOrder: {
    products: [],
    totalQuantity: 0,
  },
};

const order = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_UP_ORDER: {
      state.order = action.payload;
      return { ...state };
    }

    case ActionType.STORE_ORDER: {
      state.storedOrder.products = action.payload.orderDetails.filter((e) => {
        if (e.productType === 0 || e.producType === 2 || e.productType === 4) {
          return e;
        }
      });

      let quantity = 0;
      state.storedOrder.products.forEach((e) => {
        quantity += e.amount;
      });

      state.storedOrder.totalQuantity = quantity;
      return { ...state };
    }

    default: {
      return { ...state };
    }
  }
};

export default order;
