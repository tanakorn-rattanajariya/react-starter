import { api, classes } from "./nredux.config";
import actions from "actions";
function createDispatcher({ dispatch, service }) {
  return (classes || [])
    .map((v) => {
      return {
        [`get${v.substr(0, 1).toUpperCase()}${v.substr(1, v.length)}`]: (
          item,
          id,
          props
        ) =>
          dispatch(actions[service]("GET", v.toUpperCase(), item, id, props)),
        [`list${v.substr(0, 1).toUpperCase()}${v.substr(1, v.length)}`]: (
          item,
          id,
          props
        ) =>
          dispatch(actions[service]("LIST", v.toUpperCase(), item, id, props)),
        [`post${v.substr(0, 1).toUpperCase()}${v.substr(1, v.length)}`]: (
          item,
          id,
          props
        ) =>
          dispatch(actions[service]("POST", v.toUpperCase(), item, id, props)),
        [`put${v.substr(0, 1).toUpperCase()}${v.substr(1, v.length)}`]: (
          item,
          id,
          props
        ) =>
          dispatch(actions[service]("PUT", v.toUpperCase(), item, id, props)),
        [`delete${v.substr(0, 1).toUpperCase()}${v.substr(1, v.length)}`]: (
          item,
          id,
          props
        ) =>
          dispatch(actions[service]("DEL", v.toUpperCase(), item, id, props)),
        [`clear${v.substr(0, 1).toUpperCase()}${v.substr(1, v.length)}`]: (
          item,
          id,
          props
        ) =>
          dispatch(actions[service]("CLEAR", v.toUpperCase(), item, id, props)),
      };
    })
    .reduce((a, b) => ({ ...a, ...b }), {});
}
function useNReduxDispatcher(dispatch){
    return {
      action: {
        // interact: (api, doc, item) =>
        //   dispatch(actions.interact.call(api, doc, item)),
        ...(api || []).concat(["interact"]).reduce(
          (a, b) => ({
            ...a,
            [b]: createDispatcher({
              dispatch,
              service: `${b}_request`,
              actions,
            }),
          }),
          {}
        ),
      },
    };
}

function useNReduxMapping(state){
  const {component,interact}  = state
  const _ = (classes || []).reduce(
    (a, b) => ({
      ...a,
      [`${b}`]: state[b],
    }),
    {}
  );
  return {
    reducer: {
      component,
      interact,
      ..._,
    },
  };
}

export { useNReduxDispatcher,useNReduxMapping };