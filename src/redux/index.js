import {createStore, applyMiddleware} from "redux";
import createSagaMiddleware from 'redux-saga';
import {routerMiddleware} from "connected-react-router";
import reducer, {history} from "./reducers";
import rootSaga from "./sagas";

const sagaMiddlewares = createSagaMiddleware();

const store = createStore(
    reducer,

    //for extention in the browser
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
        applyMiddleware(
            routerMiddleware(history),
            sagaMiddlewares
        )
    )
)

// Dynamically run saga.
// Can be used to run Sagas only after the applyMiddleware phase.
// passed function rootSaga must be generator
sagaMiddlewares.run(rootSaga)

export default store