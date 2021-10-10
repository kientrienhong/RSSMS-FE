import * as ActionType from "./../constants/ActionType";

const initialState = {
  user: {},
};

const application = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_UP_USER: {
      state.user = action.payload;
      return { ...state };
    }

    default: {
      return { ...state };
    }
  }
};

export default application;
