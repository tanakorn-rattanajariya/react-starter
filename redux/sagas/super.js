import { put, fork, call, take, takeEvery, throttle } from "redux-saga/effects";
import { COMPONENT, API } from "../actions/type";
import service from "../services";
const microService = "ROUTING";

function* success(data) {
  yield put({
    type: COMPONENT.SUCCESS,
    data: data,
  });
  yield put({
    type: COMPONENT.COMPLETE,
  });
}
function* complete(data) {
  yield put({
    type: COMPONENT.COMPLETE,
    data: data,
  });
}
function* error(error) {
  yield put({
    type: COMPONENT.FAIL,
    data: error,
  });
}
function* loading(component) {
  yield put({
    type: COMPONENT.LOADING,
    component,
  });
}
/**
 * @desc Get: GET in RestAPI
 * @param uri url of service
 * @param doc document of the project
 * @param id id of object
 * @param context additional text in service
 **/
function* get({ uri, doc, id, context }) {
  const _loading = `loading_${uri.replace(/-/g, "_").toLowerCase()}`;
  const _uri = `/${uri}${context ? context : ""}${id ? `/${id}` : ""}`;
  try {
    yield call(loading, _loading);
    let response = yield call(service.get, _uri);
    yield put({
      type: API[microService][doc]["GET"]["SUCCESS"],
      data: response.data,
    });
    return yield call(complete, _loading);
  } catch (e) {
    console.log(e);
    return;
  }
}
/**
 * @desc List: GET in RestAPI
 * @param uri url of service
 * @param doc document of the project
 * @param id id of object
 * @param item payload in project
 **/
function* list({ uri, doc, item, id }) {
  const _loading = `loading_${uri.replace(/-/g, "_").toLowerCase()}`;
  const _uri = `${uri}${id ? `/${id}` : ""}`;
  try {
    yield call(loading, _loading);
    let response = yield call(service.get, _uri, item);
    yield put({
      type: API[microService][doc]["LIST"]["SUCCESS"],
      data: response.data.results || response.data,
    });
    return yield call(complete, _loading);
  } catch (e) {
    yield call(error, e?.response?.request?.responseText);
    yield call(complete);
    return;
  }
}

/**
 * @desc List: POST in RestAPI
 * @param uri url of service
 * @param doc document of the project
 * @param item payload in project
 * @param id id of object
 * @param isback boolean checking that post function is not back
 **/
function* post({ uri, doc, item, id, isback = true }) {
  const _loading = `loading_${uri.replace(/-/g, "_").toLowerCase()}`;
  const _uri = `${uri}${id ? `/${id}` : ""}`;
  try {
    yield call(loading, _loading);
    let response = yield call(service.post, _uri, item);
    yield put({
      type: API[microService][doc]["POST"]["SUCCESS"],
      data: response.data,
    });
    if (isback) {
      yield call(success, _loading);
    } else {
      yield call(complete, _loading);
    }
    return isback && history.back();
  } catch (e) {
    yield call(error, e?.response?.request?.responseText);
    yield call(complete);
  }
}

/**
 * @desc List: PUT in RestAPI
 * @param uri url of service
 * @param doc document of the project
 * @param item payload in project
 * @param id id of object
 * @param props extra object
 * @param context additional text in service
 **/
function* update({ uri, doc, item, id, context, props = {} }) {
  const _loading = `loading_${uri.replace(/-/g, "_").toLowerCase()}`;
  const _uri = `${uri}${context ? context : ""}${id ? `/${id}` : ""}`;
  try {
    yield call(loading, _loading);
    let response = yield call(service.patch, _uri, item);
    yield put({
      type: API[microService][doc]["PUT"]["SUCCESS"],
      data: response.data,
      ...props,
    });
    return yield call(success, _loading);
  } catch (e) {
    yield call(error, e?.response?.request?.responseText);
    yield call(complete);
  }
}

/**
 * @desc List: DELETE in RestAPI
 * @param uri url of service
 * @param doc document of the project
 * @param id id of object
 * @param context additional text in service
 **/
function* del({ doc, uri, id, context }) {
  const _loading = `loading_${uri.replace(/-/g, "_").toLowerCase()}`;
  const _uri = `${uri}${context ? context : ""}${id ? `/${id}` : ""}`;
  try {
    yield call(loading, _loading);
    let response = yield call(service.delete, _uri);
    yield put({
      type: API[microService][doc]["DEL"]["SUCCESS"],
      data: response.data,
    });
    yield call(success, _loading);
    return history.back();
  } catch (e) {
    yield call(error, e?.response?.request?.responseText);
    yield call(complete);
  }
}

/**
 * @desc List: GET in RestAPI
 * @param doc document of the project
 **/
function* clear({ doc }) {
  try {
    return yield put({
      type: API[microService][doc]["CLEAR"]["SUCCESS"],
    });
  } catch (e) {
    yield call(error, e?.response?.request?.responseText);
    yield call(complete);
  }
}

const useNReduxSaga = {
  list,
  get,
  post,
  update,
  del,
  clear,
  success,
  complete,
  error,
  loading,
};
export default useNReduxSaga;
//Callback
