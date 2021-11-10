import {combineReducers} from "redux";
import {createBrowserHistory} from "history";
import {connectRouter} from "connected-react-router";

export const history = createBrowserHistory();

const initial = {}

export function appReducer(state = initial, action) {
    return state
}

const rootReducer = combineReducers({
    app: appReducer,
    router: connectRouter(history)
})

export default rootReducer;