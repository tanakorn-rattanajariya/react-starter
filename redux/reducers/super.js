export default class useNReduxReducer {
  doc = "";
  api = "";
  type = "";
  constructor({ state, action }) {
    this.state = state;
    this.action = action;
    const _request = this.action?.type?.split("_");
    if ((_request || []).length > 0) {
      this.type = _request[0].toLowerCase();
      if (_request[0] === "API") {
        const index = this.findIndex(_request) - 1;
        this.doc = (_request || []).reduce(
          (a, b, i) => (i > 1 && i < index ? a + (a === "" ? "" : "_") + b : a),
          ""
        );
        this.api = _request[index];
      } else if (_request[0] === "INTERACT") {
        if (_request[1] && _request[2]) {
          this.doc = _request[1];
          this.api = _request[2];
        }
      }
    }
  }
  findIndex(word) {
    const _get = word.indexOf("GET") + 1;
    const _list = word.indexOf("LIST") + 1;
    const _post = word.indexOf("POST") + 1;
    const _put = word.indexOf("PUT") + 1;
    const _del = word.indexOf("DEL") + 1;
    const _clear = word.indexOf("CLEAR") + 1;
    return _get || _list || _post || _put || _del || _clear;
  }
  observe(_state) {
    const { doc, api } = this;
    const data = doc.toLowerCase();
    const list = `${data}s`;
    if (this.type === _state) {
      switch (api) {
        case "GET":
          return this.get(data);
        case "LIST":
          return this.list(list);
        case "CLEAR":
          return this.clear(list, data);
        case "POST":
          return this.post(list, data);
        case "PUT":
          return this.put(list, data);
        case "DELETE":
          return this.delete(list);
        default:
          return { ...this.state };
      }
    } else {
      return { ...this.state };
    }
  }
  get(key = "data") {
    let record = this.state;
    record[key] = this.action.data;
    return { ...record };
  }
  search(key = "list") {
    let record = this.state;
    record[key] = this.action.data;
    return { ...record };
  }
  list(key = "list", val = "id", dat = "data") {
    let record = this.state;
    record[key] = this.action.data
      .map((v) => ({ ...v, key: v.id }))
      .sort((a, b) => (a.ord || 0) - (b.ord || 0));
    record[dat] = {};
    return { ...record };
  }
  clear(key = "list", data = "data") {
    let record = this.state;
    record[key] = [];
    record[data] = null;
    return { ...record };
  }
  post(list = "list", key = "data") {
    let record = this.state;
    if (record[list]) {
      record[list] = [
        { key: this.action.data.id, ...this.action.data },
        ...this.state[list],
      ].sort((a, b) => (a.ord || 0) - (b.ord || 0));
    }else{
      record[list] = [this.action.data];
    }
    record[key] = this.action.data;
    return { ...record };
  }
  push(key = "list") {
    let record = this.state;
    record[key] = [...this.state[key], this.action.data];
    return { ...record };
  }
  put(list = "list", key = "data", id = "id") {
    let record = this.state;
    record[key] = this.action.data;
    record[list] = (record[list] || [])
      .map((v) =>
        v[id] === this.action.data[id] ? { ...this.action.data } : { ...v }
      )
      .sort((a, b) => (a.ord || 0) - (b.ord || 0));
    return { ...record };
  }
  delete(key = "list", val = "id") {
    let record = this.state;
    record[key] = this.state[key]
      .filter((v) => v[val] !== this.action.data)
      .sort((a, b) => (a.ord || 0) - (b.ord || 0));
    return { ...record };
  }
  insertOrUpdate(key = "list") {
    let record = this.state;
    record[key] = this.action.data;
    return { ...record };
  }
}
