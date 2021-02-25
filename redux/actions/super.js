import { INTERACT_REQUEST, requests } from "./type";
const call = Object.keys(requests || {})
  .map((k) => {
    return {
      [`${k.toLowerCase()}`]: (api, doc, item, id, props) => ({
        type: k,
        api,
        doc,
        item,
        id,
        props,
      }),
    };
  })
  .reduce((a, b) => ({ ...a, ...b }), {});
export default {
  ...call,
  interact_request: (api, doc, item, id, props) => ({
    type: INTERACT_REQUEST,
    api,
    doc,
    item,
    id,
    props,
  }),
};
