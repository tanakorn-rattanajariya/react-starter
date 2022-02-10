import { all } from "redux-saga/effects";
import { interact } from "./interact";
import {example} from './example'
export default function* saga() {
  yield all([interact(),example()]);
}
