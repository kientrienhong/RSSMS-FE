import * as ActionType from "./../constants/ActionType";

const initialState = {
  loading: false,
  snackbar: false,
  typeSnackbar: "",
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
      state.typeSnackbar = action.payload.typeSnackbar;
      state.msgSnackbar = action.payload.msgSnackbar;

      return { ...state };
    }

    case ActionType.HIDE_SNACKBAR: {
      state.loading = false;
      state.typeSnackbar = "";
      state.msgSnackbar = "";

      return { ...state };
    }
    default: {
      return { ...state };
    }
  }
};

export default application;
