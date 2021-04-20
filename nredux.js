import { api, classes } from "./nredux.config";
import actions from "actions";
function replaceString(str) {
  const toCamel = `${str.substr(0, 1).toUpperCase()}${str.substr(
    1,
    str.length
  )}`;
  var newStr = "";
  for (var i = 0; i < toCamel.length; i++) {
    if (toCamel[i] === "-") {
      if (toCamel.length > i + 1) {
        newStr += toCamel[i + 1].toUpperCase();
        i += 2;
      }
    }
    newStr += toCamel[i];
  }
  return newStr;
}
function createDispatcher({ dispatch, service }) {
  return (classes || [])
    .map((v) => {
      return {
        [`get${replaceString(v)}`]: (item, id, props) =>
          dispatch(actions[service]("GET", v.toUpperCase(), item, id, props)),
        [`list${replaceString(v)}`]: (item, id, props) =>
          dispatch(actions[service]("LIST", v.toUpperCase(), item, id, props)),
        [`post${replaceString(v)}`]: (item, id, props) =>
          dispatch(actions[service]("POST", v.toUpperCase(), item, id, props)),
        [`put${replaceString(v)}`]: (item, id, props) =>
          dispatch(actions[service]("PUT", v.toUpperCase(), item, id, props)),
        [`delete${replaceString(v)}`]: (item, id, props) =>
          dispatch(actions[service]("DEL", v.toUpperCase(), item, id, props)),
        [`clear${replaceString(v)}`]: (item, id, props) =>
          dispatch(actions[service]("CLEAR", v.toUpperCase(), item, id, props)),
      };
    })
    .reduce((a, b) => ({ ...a, ...b }), {});
}
function useNReduxDispatcher(dispatch) {
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

function useNReduxMapping(state) {
  const { component, interact } = state;
  const _ = (api || []).reduce(
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

export { useNReduxDispatcher, useNReduxMapping };
