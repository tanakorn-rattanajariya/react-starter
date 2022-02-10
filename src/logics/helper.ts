declare global {
  interface Number {
    format: (n: number, x?: number) => string;
  }

  interface Array<T> {
    first: () => any | null;
    last: () => any | null;
    groupBy: (key: any) => any | null;
    toSet: () => Set<T>;
    insert: (index: number, item: T) => void;
    remove: (index: number, number?: number) => void;
    toDict: (key?: string) => {};
    unique: () => Array<T>;
    replaceWith: (data: Record<string, any>, id?: any) => {};
    insertOrUpdate: (data: any) => Array<T>;
  }

  interface Set<T> {
    toArray: () => Array<T>;
  }

  interface String {
    shorten: (l: number) => String;
  }
}

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
Array.prototype.toDict = function (key) {
  let dict: Record<string, any> = {};
  for (var v of this) {
    dict[v[key || "uid"]] = v;
  }
  return dict;
};
Array.prototype.unique = function () {
  const tmp = this;
  const dict: Record<string, any> = tmp.toDict();
  const unique = this.map((v) => v.id)
    .toSet()
    .toArray();
  return unique.map((v) => dict[v]);
};
Array.prototype.replaceWith = function (data, id = "name") {
  return (this || [])
    .map((v) => {
      return data[v[id]]
        ? { ...v, ...data[v[id]] }
        : data[v[id]] === null
        ? null
        : v;
    })
    .filter((f) => f);
};

Array.prototype.insertOrUpdate = function (data) {
  return (this || []).length === 0
    ? [data]
    : this.map((v) => (v.key === data.key ? { ...v, ...data } : v));
};

String.prototype.shorten = function (l) {
  return this.length > l ? this.substring(0, l) + "..." : this;
};

export {};
