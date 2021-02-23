import { api } from "./nredux.config";
import { createDispatcher } from "logics/helper";
import actions from "actions";
function useNReduxDispatcher(dispatch){
    return {
      action: {
        interact: (api, doc, item) =>
          dispatch(actions.interact.call(api, doc, item)),
        ...(api || []).reduce(
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
export { useNReduxDispatcher };