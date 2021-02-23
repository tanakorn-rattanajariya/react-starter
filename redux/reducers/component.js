import { COMPONENT } from "../actions/type";
const initialState = {
  loading: false,
  success: false,
  component: null
};
export default function auth(state = initialState, action) {
  switch (action.type) {
    case COMPONENT.LOADING:
      let _loading = {
        ...state,
        loading: true,
        success: false
      };
      if (action.component) {
        _loading[action.component] = true;
      }
      return _loading;
    case COMPONENT.SUCCESS:
      let _success = {
        ...state,
        loading: false,
        success: true,
      };
      if (action.data) {
        _success[action.data] = null;
      }
      return _success;
    case COMPONENT.FAIL:
      return { loading: false, error: action.data };
    case COMPONENT.COMPLETE:
      let _complete = {
        ...state,
        loading: false,
        success: false,
        component: null,
        error: null
      };
      if (action.data) {
        _complete[action.data] = null;
      }
      return {
        ..._complete
      };
    default:
      return state;
  }
}
