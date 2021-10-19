import { combineReducers } from "redux";
import application from "./application";
import information from "./information";
import order from "./order";

const rootReducer = combineReducers({
  // nơi chứa các reducers con cho từng mục store con
  application,
  information,
  order,
});

export default rootReducer;
