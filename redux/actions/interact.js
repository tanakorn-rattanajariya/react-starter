import { INTERACT_REQUEST } from "./type";
export default {
  call: (api, doc, item) => ({
    type: INTERACT_REQUEST,
    api,
    doc,
    item,
  }),
};
