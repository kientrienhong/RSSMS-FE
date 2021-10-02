import * as ActionType from "./../constants/ActionType";

const initialState = {
  loading: false,
};

const application = (state = initialState, action) => {
  console.log("dasdkjlasjkld");
  switch (action.type) {
    case ActionType.SHOW_LOADER: {
      console.log("test2");

      state.loading = true;

      return { ...state };
    }

    case ActionType.HIDE_LOADER: {
      state.loading = false;

      return { ...state };
    }

    default: {
      return { ...state };
    }
  }
};

export default application;
