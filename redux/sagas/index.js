import { all } from "redux-saga/effects";
import { interact } from "./interact";
export default function* saga() {
  yield all([interact()]);
}
