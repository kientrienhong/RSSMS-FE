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
      state.storedOrder.products = action.payload.orderDetails;

      let quantity = 0;
      action.payload.orderDetails.forEach((e) => {
        quantity += e.amount;
      });

      state.storedOrder.totalQuantity = quantity;
      console.log("state ===== ", state);
      return { ...state };
    }

    default: {
      return { ...state };
    }
  }
};

export default order;
