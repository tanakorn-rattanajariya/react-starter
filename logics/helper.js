import { classes } from "../nredux.config";
import actions from "actions";
Number.prototype.format = function (n, x) {
  const re = "\\d(?=(\\d{" + (x || 3) + "})+" + (n > 0 ? "\\." : "$") + ")";
  return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, "g"), "$&,");
};
Array.prototype.first = function () {
  return (this || []).length > 0 ? this[0] : null;
};
Array.prototype.last = function () {
  return (this || []).length > 0 ? this[this.length - 1] : null;
};
Array.prototype.groupBy = function (key) {
  return (this || []).reduce((rv, x) => {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};
Array.prototype.toSet = function () {
  return new Set(this);
};
Set.prototype.toArray = function () {
  return Array.from(this);
};
Array.prototype.insert = function (index, item) {
  this.splice(index, 0, item);
};
Array.prototype.remove = function (index, number = 1) {
  this.splice(index, number);
};
Array.prototype.toDict = function () {
  let dict = {};
  for (var v of this) {
    dict[v.id] = v;
  }
  return dict;
};
Array.prototype.unique = function () {
  const tmp = this;
  const dict = tmp.toDict();
  const unique = this.map((v) => v.id)
    .toSet()
    .toArray();
  return unique.map((v) => dict[v]);
};
function toSorter(a, b) {
  return a.localeCompare(b);
}
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
export { createDispatcher };
