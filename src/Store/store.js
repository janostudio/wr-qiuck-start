import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import rootReducer from "../Reducers/rootReducer";
import rootSaga from '../Sagas';

const store = createStore(
  rootReducer,
  applyMiddleware(createSagaMiddleware(), logger())
);

sagaMiddleware.run(rootSaga);

export default store;