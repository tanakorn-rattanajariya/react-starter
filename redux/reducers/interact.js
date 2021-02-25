const initialState = {};
import useNReduxReducer from "./super";
export default function interact(state = initialState, action) {
  const reducer = new useNReduxReducer({ state, action });
  switch (action.type) {
    default:
      return reducer.observe("interact");
  }
}