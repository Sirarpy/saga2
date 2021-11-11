import {combineReducers} from "redux";
import {createBrowserHistory} from "history";
import {connectRouter} from "connected-react-router";

export const history = createBrowserHistory();

const initial = {
    blog: {}
}

export function appReducer(state = initial, action) {
    switch (action.type) {
        case 'BLOG_LOADED':
            return {
                ...state,
                blog: action.payload,
            }
    }
    return state
}

const rootReducer = combineReducers({
    app: appReducer,
    router: connectRouter(history)
})

export default rootReducer;