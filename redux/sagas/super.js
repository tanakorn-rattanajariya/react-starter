import {
  put,
  fork,
  call,
  take,
  takeEvery,
  throttle,
  select,
} from "redux-saga/effects";
import { COMPONENT, API, INTERACT } from "../actions/type";
import service from "../services";
import Router from "next/router";
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
const getToken = (state) => state?.matching?.cognito_session?.idToken?.jwtToken;
/**
 * @desc Get: GET in RestAPI
 * @param uri url of service
 * @param doc document of the project
 * @param id id of object
 * @param context additional text in service
 **/
function* get({ doc, id, context, mcs, customService }) {
  const token = yield select(getToken);
  const _uri = `${mcs ? `${mcs.toLowerCase()}/` : ""}${doc
    .toLowerCase()
    .replace(/-/g, "/")
    .replace(/_/g, "-")}${id ? `/${id}` : ""}`;
  const _loading = `loading_${doc.toLowerCase().replace(/-/g, "_")}`;
  try {
    yield call(loading, _loading);
    let response = yield call(customService || service.get, token, _uri);
    yield put({
      type: API[mcs][doc]["GET"]["SUCCESS"],
      data: response?.data || response,
    });
    return yield call(complete, _loading);
  } catch (e) {
    console.log(e);
    return yield call(error, e);
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
  const token = yield select(getToken);
  const _uri = `${mcs ? `${mcs.toLowerCase()}/` : ""}${doc
    .toLowerCase()
    .replace(/-/g, "/")
    .replace(/_/g, "-")}${id ? `/${id}` : ""}`;
  const _loading = `loading_${doc.toLowerCase().replace(/-/g, "_")}`;
  try {
    yield fork(loading, _loading);
    let response = yield call(service.get, token, _uri, item);
    yield put({
      type: API[mcs][doc]["LIST"]["SUCCESS"],
      data: response.data.content || response.data.results || response.data,
    });
    return yield fork(complete, _loading);
  } catch (e) {
    console.log(e);
    yield put({
      type: API[mcs][doc]["LIST"]["SUCCESS"],
      data: []
    });
    yield fork(error, e?.response?.data?.detail || e?.response?.status);
    yield fork(complete);
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
function* post({
  doc,
  item,
  id,
  isback = true,
  router,
  mcs,
  customService,
  forceMessage,
}) {
  const token = yield select(getToken);
  const _uri = `${mcs ? `${mcs.toLowerCase()}/` : ""}${doc
    .toLowerCase()
    .replace(/-/g, "/")
    .replace(/_/g, "-")}${id ? `/${id}` : ""}`;
  const _loading = `loading_${doc.toLowerCase().replace(/-/g, "_")}`;
  try {
    yield call(loading, _loading);
    let response = yield call(customService || service.post, token, _uri, item);
    yield put({
      type: API[mcs][doc]["POST"]["SUCCESS"],
      data: response?.data || response,
    });
    if (isback || forceMessage) {
      yield call(success, _loading);
    } else {
      yield call(complete, _loading);
    }
    return isback && Router.back();
  } catch (e) {
    console.log(e);
    yield call(
      error,
      e?.response?.data?.detail || e.message || e?.response?.status
    );
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
  const token = yield select(getToken);
  const _uri = `${mcs ? `${mcs.toLowerCase()}/` : ""}${doc
    .toLowerCase()
    .replace(/-/g, "/")
    .replace(/_/g, "-")}${id ? `/${id}` : ""}`;
  const _loading = `loading_${doc.toLowerCase().replace(/-/g, "_")}`;
  try {
    yield call(loading, _loading);
    let response = yield call(service.put, token, _uri, item);
    yield put({
      type: API[mcs][doc]["PUT"]["SUCCESS"],
      data: response.data,
      ...props,
    });
    return yield call(success, _loading);
  } catch (e) {
    yield call(error, e?.response?.data?.detail || e?.response?.status);
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
function* del({ doc, id, mcs, deletedList, isback = true }) {
  const token = yield select(getToken);
  const _uri = `${mcs ? `${mcs.toLowerCase()}/` : ""}${doc
    .toLowerCase()
    .replace(/-/g, "/")
    .replace(/_/g, "-")}${id ? `/${id}` : ""}`;
  const _loading = `loading_${doc.toLowerCase().replace(/-/g, "_")}`;
  try {
    yield call(loading, _loading);
    let response = yield call(service.delete, token, _uri, deletedList);
    yield put({
      type: API[mcs][doc]["DEL"]["SUCCESS"],
      data: id || deletedList,
    });
    yield call(success, _loading);
    if (isback) {
      return Router.back();
    } else {
      return;
    }
  } catch (e) {
    console.log(e);

    yield call(error, e?.response?.data?.detail || e?.response?.status);
    yield call(complete);
  }
}

/**
 * @desc List: GET in RestAPI
 * @param doc document of the project
 **/
function* clear({ doc, mcs }) {
  const token = yield select(getToken);
  try {
    return yield put({
      type: API[mcs][doc]["CLEAR"]["SUCCESS"],
    });
  } catch (e) {
    yield call(error, e?.response?.data?.detail || e?.response?.status);
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
