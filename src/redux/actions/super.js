import { INTERACT_REQUEST } from "./type";
import types from "./type";
const call = Object.keys(types || {})
  .map((k) => {
    return {
      [`${k.toLowerCase()}`]: (api, mcs, doc, item, id, props) => ({
        type: k,
        api,
        doc,
        item,
        id,
        props,
        mcs,
      }),
    };
  })
  .reduce((a, b) => ({ ...a, ...b }), {});
export default {
  ...call,
  interact_request: (api, mcs, doc, item, id, props) => ({
    type: INTERACT_REQUEST,
    api,
    doc,
    item,
    id,
    props,
  }),
};
