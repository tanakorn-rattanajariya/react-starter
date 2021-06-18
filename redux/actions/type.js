import { api, classes } from "../../nredux.config";
//API
const APIs = ["LIST", "GET", "POST", "PUT", "DEL", "CLEAR"];
//TYPES
const TYPE = ["SUCCESS", "FAIL", "LOADING", "COMPLETE"];

const services = [];
const interacts = [];
function createCRUDE(base, is_interact) {
  return api.reduce((acc, type) => {
    acc[type] = is_interact ? `${base}_${type}` : createType(`${base}_${type}`);
    return acc;
  }, {});
}
function createType(base) {
  return TYPE.reduce((acc, type) => {
    acc[type] = `${base}_${type}`;
    return acc;
  }, {});
}
//COMPONENT
const COMPONENT = createType("COMPONENT");

//STATION
function createDoc(base, docs, is_interact) {
  return docs.reduce((acc, type) => {
    acc[type] = createCRUDE(`${base}_${type.toUpperCase()}`, is_interact);
    return acc;
  }, {});
}
function createAPI() {
  return api.reduce(
    (c, d) => ({
      ...c,
      [d.toUpperCase()]: classes.reduce(
        (e, f) => ({
          ...e,
          [f.toUpperCase()]: APIs.reduce(
            (g, h) => ({
              ...g,
              [h]: TYPE.reduce(
                (i, j) => ({
                  ...i,
                  [j]: `API_${d.toUpperCase()}_${f.toUpperCase()}_${h}_${j}`,
                }),
                {}
              ),
            }),
            {}
          ),
        }),
        {}
      ),
    }),
    {}
  );
}
function createInteract() {
  return classes.reduce(
    (e, f) => ({
      ...e,
      [f.toUpperCase()]: APIs.reduce(
        (g, h) => ({
          ...g,
          [h]: `INTERACT_${f.toUpperCase()}_${h}`,
        }),
        {}
      ),
    }),
    {}
  );
}

const requests = (api || []).reduce(
  (a, b) => ({
    ...a,
    [`${b.toUpperCase()}_REQUEST`]: `${b.toUpperCase()}_REQUEST`,
    [`${b.toUpperCase()}_DEBOUNCE_REQUEST`]: `${b.toUpperCase()}_DEBOUNCE_REQUEST`,
  }),
  {}
);

const API = createAPI();
const INTERACT = createInteract();
const INTERACT_REQUEST = "INTERACT_REQUEST";
const types = { ...requests };
export { API, COMPONENT, INTERACT_REQUEST, INTERACT };
export default types;
