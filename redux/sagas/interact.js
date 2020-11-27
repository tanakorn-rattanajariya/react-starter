import { INTERACT_REQUEST, INTERACT, COMPONENT } from "../actions/type";
import { put, fork, call, take, takeEvery, throttle } from "redux-saga/effects";
import service from "../services";

function* request(actions) {
  try {
    switch (actions.api) {
      case "GET":
        return yield fork(get, actions);
      case "POST":
        return yield fork(post, actions);
      case "PUT":
        return yield fork(change, actions);
      case "DEL":
        return yield fork(del, actions);
      case "LIST":
        return yield fork(list, actions);
      case "CLEAR":
        return yield fork(clear, actions);
      default:
        return;
    }
  } catch (e) {
    console.log(e);
  }
}

function* clear(actions) {
  try {
    switch (actions.doc) {
      case "ENDPOINT":
        return yield put({
          type: INTERACT.ROUTING.ENDPOINT.CLEAR,
        });
      case "CAR":
        return yield put({
          type: INTERACT.ROUTING.CAR.CLEAR,
        });
      case "CUSTOMER":
        return yield put({
          type: INTERACT.ROUTING.CUSTOMER.CLEAR,
        });
      case "ROUTE":
        return yield put({
          type: INTERACT.ROUTING.ROUTE.CLEAR,
        });
      default:
        return;
    }
  } catch (e) {
    console.log(e);
    return yield call(error, e);
  }
}
function* get(actions) {
  try {
    switch (actions.doc) {
      case "ENDPOINT":
        return yield put({
          type: INTERACT.ROUTING.ENDPOINT.GET,
          data: actions.item,
        });
      case "CUSTOMER":
        return yield put({
          type: INTERACT.ROUTING.CUSTOMER.GET,
          data: actions.item,
        });
      default:
        return;
    }
  } catch (e) {
    console.log(e);
    return yield call(error, e);
  }
}
function* post(actions) {
  try {
    switch (actions.doc) {
      case "ITEM":
        return yield put({
          type: INTERACT.ROUTING.ITEM.POST,
          data: actions.item,
        });
      case "CAR":
        return yield put({
          type: INTERACT.ROUTING.CAR.POST,
          data: actions.item,
        });
      case "ROUTE":
        return yield put({
          type: INTERACT.ROUTING.ROUTE.POST,
          data: actions.item,
        });
      case "DC":
        return yield put({
          type: INTERACT.ROUTING.DC.POST,
          data: actions.item,
        });
      case "SUBROUTE":
        return yield put({
          type: INTERACT.ROUTING.SUBROUTE.POST,
          data: actions.item,
        });
      case "ENDPOINT":
        yield put({
          type: INTERACT.ROUTING.ENDPOINT.POST,
          data: actions.item,
        });
        return history.back();
      default:
        return;
    }
  } catch (e) {
    return yield call(error, e);
  }
}
function* change(actions) {
  try {
    switch (actions.doc) {
      case "DRAW_CLEAR":
        return yield put({
          type: INTERACT.ROUTING.DRAW_CLEAR.PUT,
        });
      case "DRAW_START":
        return yield put({
          type: INTERACT.ROUTING.DRAW_START.PUT,
        });
      case "DRAW_MOVE":
        return yield put({
          type: INTERACT.ROUTING.DRAW_MOVE.PUT,
          item: actions.item,
        });
      case "ENDPOINT":
        yield put({
          type: INTERACT.ROUTING.ENDPOINT.PUT,
          data: { ...actions.item, _id: actions.item._id },
        });
        return history.back();
      default:
        return;
    }
  } catch (e) {
    return yield call(error, e);
  }
}
function* del(actions) {
  try {
    switch (actions.doc) {
      case "ITEM":
        return yield put({
          type: INTERACT.ROUTING.ITEM.DEL,
          data: actions.item,
        });
      case "CAR":
        return yield put({
          type: INTERACT.ROUTING.CAR.DEL,
          data: actions.item.id,
        });
      case "ROUTE":
        return yield put({
          type: INTERACT.ROUTING.ROUTE.DEL,
          data: actions.item.id,
        });
      case "ENDPOINT":
        return yield put({
          type: INTERACT.ROUTING.ENDPOINT.DEL,
          data: actions.item.id,
        });
      default:
        return;
    }
  } catch (e) {
    return yield call(error, e);
  }
}
function* list(actions) {
  try {
    switch (actions.doc) {
      case "CAR":
        return yield put({
          type: INTERACT.ROUTING.CAR.LIST,
          data: actions.item,
        });
      case "ENDPOINT":
        return yield put({
          type: INTERACT.ROUTING.ENDPOINT.LIST,
          data: actions.item,
        });
      default:
        return;
    }
  } catch (e) {
    return yield call(error, e);
  }
}

//Callback
function* success() {
  yield put({
    type: COMPONENT.SUCCESS,
  });
}
function* error(error) {
  yield put({
    type: COMPONENT.FAIL,
    data: error,
  });
}
function* loading() {
  yield put({
    type: COMPONENT.LOADING,
  });
}

export function* interact() {
  yield takeEvery(INTERACT_REQUEST, request);
}
