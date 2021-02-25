import { combineReducers } from "redux";
import component from "./component";
import interact from "./interact";
const reducers = combineReducers({
  component,
  interact
});

export default reducers;
