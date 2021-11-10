import {createStore, applyMiddleware} from "redux";
import createSagaMiddleware from 'redux-saga';
import {routerMiddleware} from "connected-react-router";
import reducer, {history} from "./reducers";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    reducer,

    //for extention in the browser
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
        applyMiddleware(
            routerMiddleware(history),
            sagaMiddleware
        )
    )
)

// Dynamically run saga.
// Can be used to run Sagas only after the applyMiddleware phase.
// passed function rootSaga must be generator
sagaMiddleware.run(rootSaga)

export default store