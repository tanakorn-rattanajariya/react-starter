import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { createLogger } from "redux-logger";
import reducers from "./reducers";
import sagas from "./sagas";
import { composeWithDevTools } from "redux-devtools-extension";
const sagaMiddleware = createSagaMiddleware();
const middleWare = (middle) => {
  return composeWithDevTools(applyMiddleware(...middle));
};
const store =
  process.env.NODE_ENV === "development"
    ? createStore(reducers, middleWare([sagaMiddleware, createLogger()]))
    : createStore(reducers, middleWare([sagaMiddleware]));

sagaMiddleware.run(sagas);
export default store;
