import { combineReducers } from "redux";
import application from "./application";
import information from "./information";
const rootReducer = combineReducers({
  // nơi chứa các reducers con cho từng mục store con
  application,
  information,
});

export default rootReducer;
