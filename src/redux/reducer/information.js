import * as ActionType from "./../constants/ActionType";

const initialState = {
  user: {},
};

const application = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOG_IN: {
      state.user = state.payload;
      return { ...state };
    }

    default: {
      return { ...state };
    }
  }
};

export default application;
