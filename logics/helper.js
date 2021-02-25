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

