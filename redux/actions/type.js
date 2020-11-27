//API
const APIs = ["LIST", "GET", "POST", "PUT", "DEL", "CLEAR"];
//TYPES
const TYPE = ["SUCCESS", "FAIL", "LOADING", "COMPLETE"];

const services = [];
const interacts = [];
function createCRUDE(base, is_interact) {
  return APIs.reduce((acc, type) => {
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
    acc[type] = createCRUDE(`${base}_${type}`, is_interact);
    return acc;
  }, {});
}
function createAPI(base) {
  return ["ROUTING"].reduce((acc, type) => {
    acc[type] = createDoc(`${base}_${type}`, services);
    return acc;
  }, {});
}
function createInteract(base) {
  return ["ROUTING"].reduce((acc, type) => {
    acc[type] = createDoc(`${base}_${type}`, interacts, true);
    return acc;
  }, {});
}

const API = createAPI("API");
const ROUTING_REQUEST = "ROUTING_REQUEST";

const INTERACT = createInteract("INTERACT");
const INTERACT_REQUEST = "INTERACT_REQUEST";
const ROUTING_REQUEST_INTERVAL = "ROUTING_REQUEST_INTERVAL";
const QUEUE_REQUEST = "QUEUE_REQUEST";

export { API, COMPONENT, INTERACT_REQUEST, INTERACT };
