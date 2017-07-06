import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga';
import rootReducer from "../Reducers/rootReducer";
import sagas from '../Sagas';

const sagaMiddleware = createSagaMiddleware(sagas);
const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
);

export default store;