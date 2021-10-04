import * as ActionType from "./../constants/ActionType";

const initialState = {
  loading: false,
  snackbar: false,
  typeSnackbar: "success",
  msgSnackbar: "",
};

const application = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SHOW_LOADER: {
      state.loading = true;

      return { ...state };
    }

    case ActionType.HIDE_LOADER: {
      state.loading = false;

      return { ...state };
    }
    case ActionType.SHOW_SNACKBAR: {
      state.snackbar = true;
      state.typeSnackbar = action.payload.type;
      state.msgSnackbar = action.payload.msg;

      return { ...state };
    }

    case ActionType.HIDE_SNACKBAR: {
      state.snackbar = false;
      state.typeSnackbar = "success";
      state.msgSnackbar = "";

      return { ...state };
    }
    default: {
      return { ...state };
    }
  }
};

export default application;
