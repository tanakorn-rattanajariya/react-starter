import { combineReducers } from "redux";
import component from "./component";
import interact from "./interact";
import example from './example'
const reducers = combineReducers({
  component,
  interact,
  example,
});

export default reducers;
