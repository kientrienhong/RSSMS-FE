import * as ActionType from "./../constants/ActionType";

const initialState = {
  user: {},
  notifications: [],
  unReadNoti: [],
};

const information = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_UP_USER: {
      state.user = action.payload;
      return {...state};
    }

    case ActionType.SET_UP_NOTIFICATIONS: {
      state.notifications = action.payload;
      state.unReadNoti = action.payload.filter((e) => e.isRead === false);
      return {...state};
    }

    case ActionType.SET_UP_IS_READ_NOTI: {
      state.unReadNoti = [];
      return {...state};
    }

    case ActionType.ADD_NOTIFICATIONS: {
      console.log(state.notifications);
      let notificationsTemp = [...state.notifications];
      notificationsTemp.unshift(action.payload);
      state.unReadNoti.unshift(action.payload);
      return {...state, notifications: notificationsTemp};
    }

    default: {
      return {...state};
    }
  }
};

export default information;
