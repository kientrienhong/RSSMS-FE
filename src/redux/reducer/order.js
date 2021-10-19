import * as ActionType from "./../constants/ActionType";

const initialState = {
  order: {},
};

const order = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_UP_ORDER: {
      state.order = action.payload;
      return { ...state };
    }

    default: {
      return { ...state };
    }
  }
};

export default order;
