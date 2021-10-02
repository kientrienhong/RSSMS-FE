import { combineReducers } from "redux";
import application from "./application";
const rootReducer = combineReducers({
  // nơi chứa các reducers con cho từng mục store con
  application,
});

export default rootReducer;
