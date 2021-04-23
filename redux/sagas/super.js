import { put, fork, call, take, takeEvery, throttle } from "redux-saga/effects";
import { COMPONENT, API, INTERACT } from "../actions/type";
import service from "../services";

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
function* get({ uri, doc, id, context, mcs }) {
  const _loading = `loading_${uri.replace(/-/g, "_").toLowerCase()}`;
  const _uri = `/${uri}${context ? context : ""}${id ? `/${id}` : ""}`;
  try {
    yield call(loading, _loading);
    let response = yield call(service.get, _uri);
    yield put({
      type: API[mcs][doc]["GET"]["SUCCESS"],
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
function* list({ doc, item, id, mcs }) {
  const _uri = `${doc.toLowerCase().replace(/-/g, "/").replace(/_/g, "-")}${
    id ? `/${id}` : ""
  }`;
  const _loading = `loading_${doc.toLowerCase().replace(/-/g, "_")}`;
  try {
    yield call(loading, _loading);
    let response = yield call(service.get, _uri, item);
    yield put({
      type: API[mcs][doc]["LIST"]["SUCCESS"],
      data: response.data.content || response.data.results || response.data,
    });
    return yield call(complete, _loading);
  } catch (e) {
    console.log(e);
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
 * @param router router for react native
 **/
function* post({ doc, item, id, isback = true, router, mcs }) {
  const _uri = `${doc.toLowerCase().replace(/-/g, "/").replace(/_/g, "-")}${
    id ? `/${id}` : ""
  }`;
  const _loading = `loading_${doc.toLowerCase().replace(/-/g, "_")}`;
  try {
    yield call(loading, _loading);
    let response = yield call(service.post, _uri, item);
    yield put({
      type: API[mcs][doc]["POST"]["SUCCESS"],
      data: response.data,
    });
    if (isback) {
      yield call(success, _loading);
    } else {
      yield call(complete, _loading);
    }
    return isback && router?.goBack();
  } catch (e) {
    console.log(e);
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
function* update({ doc, item, id, context, props = {}, mcs }) {
  const _uri = `${doc.toLowerCase().replace(/-/g, "/").replace(/_/g, "-")}${
    id ? `/${id}` : ""
  }`;
  const _loading = `loading_${doc.toLowerCase().replace(/-/g, "_")}`;
  try {
    yield call(loading, _loading);
    let response = yield call(service.put, _uri, item);
    yield put({
      type: API[mcs][doc]["PUT"]["SUCCESS"],
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
function* del({ doc, uri, id, context, mcs }) {
  const _loading = `loading_${uri.replace(/-/g, "_").toLowerCase()}`;
  const _uri = `${uri}${context ? context : ""}${id ? `/${id}` : ""}`;
  try {
    yield call(loading, _loading);
    let response = yield call(service.delete, _uri);
    yield put({
      type: API[mcs][doc]["DEL"]["SUCCESS"],
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
function* clear({ doc, mcs }) {
  try {
    return yield put({
      type: API[mcs][doc]["CLEAR"]["SUCCESS"],
    });
  } catch (e) {
    yield call(error, e?.response?.request?.responseText);
    yield call(complete);
  }
}

function* useInternalSaga({ api, doc, item, id, props }) {
  return yield put({
    type: INTERACT[doc][api],
    data: item,
    id,
    props,
  });
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
  useInternalSaga,
};
export default useNReduxSaga;
//Callback
