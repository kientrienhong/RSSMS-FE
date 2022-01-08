import * as ActionType from "./../constants/ActionType";

const initialState = {
  user: {},
  notifcations: [],
};

const information = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_UP_USER: {
      state.user = action.payload;
      return { ...state };
    }

    case ActionType.SET_UP_NOTIFCATIONS: {
      state.notifcations = action.payload;
      return { ...state };
    }

    case ActionType.ADD_NOTIFCATIONS: {
      let notifcationsTemp = [...state.notifcations];
      notifcationsTemp.push(action.payload);
      return { ...state, notifcations: notifcationsTemp };
    }

    default: {
      return { ...state };
    }
  }
};

export default information;
