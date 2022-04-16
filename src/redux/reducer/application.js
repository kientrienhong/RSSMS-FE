import * as ActionType from "./../constants/ActionType";

const initialState = {
  loading: false,
  snackbar: false,
  typeSnackbar: "success",
  msgSnackbar: "",
  isOpenExtendSession: false,
  isViewStoredModal: false,
  isOpenStoredModal: false,
  isCurrentStoreOrder: false,
  progressModal: {
    isOpen: false,
    title: "",
    yesFunction: null,
    noFunction: null,
  },
};

const application = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SHOW_LOADER: {
      state.loading = true;

      return {...state};
    }

    case ActionType.HIDE_LOADER: {
      state.loading = false;

      return {...state};
    }
    case ActionType.SHOW_SNACKBAR: {
      state.snackbar = true;
      state.typeSnackbar = action.payload.type;
      state.msgSnackbar = action.payload.msg;

      return {...state};
    }

    case ActionType.HIDE_SNACKBAR: {
      state.snackbar = false;
      state.typeSnackbar = "success";
      state.msgSnackbar = "";

      return {...state};
    }

    case ActionType.HANDLE_CURRENT_STORE_ORDER: {
      state.isCurrentStoreOrder = action.payload;
      return {...state};
    }

    case ActionType.HANDLE_PROGRESS_MODAL: {
      state.progressModal.isOpen = action.payload.isOpen;
      state.progressModal.title = action.payload.title;
      state.progressModal.yesFunction =
        action.payload.yesFunction === undefined
          ? state.progressModal.yesFunction
          : action.payload.yesFunction;
      state.progressModal.noFunction =
        action.payload.noFunction === undefined
          ? state.progressModal.noFunction
          : action.payload.noFunction;

      return {...state};
    }

    case ActionType.CLOSE_ORDER_MODAL: {
      state.isOpenStoredModal = false;
      state.isViewStoredModal = false;
      return {...state};
    }

    case ActionType.HANDLE_OPEN_EXTEND_SESSION: {
      state.isOpenExtendSession = action.payload;
      return {...state};
    }

    case ActionType.OPEN_ORDER_MODAL: {
      state.isViewStoredModal = action.payload;
      state.isOpenStoredModal = true;
      return {...state};
    }

    default: {
      return {...state};
    }
  }
};

export default application;
