import { createStore, applyMiddleware, compose } from "redux";
import createHistory from 'history/createBrowserHistory';
import createSagaMiddleware from "redux-saga";
import freeze from "redux-freeze";
import { reducers } from "./reducers";
import { sagas } from "./sagas";

let middlewares = [];
const history = createHistory();
const sagaMiddleware = createSagaMiddleware();
middlewares.push(sagaMiddleware);

if (process.env.NODE_ENV !== 'production') {
  middlewares.push(freeze);
}

let middleware = applyMiddleware(...middlewares);

if (process.env.NODE_ENV !== 'production' && window.devToolsExtension) {
  middleware = compose(middleware, window.devToolsExtension());
}

const store = createStore(reducers, middleware);
sagaMiddleware.run(sagas);

// export
export { store, history };