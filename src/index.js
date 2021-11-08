import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {createBrowserHistory} from "history";
import App from './pages/App';
import Blog from "./pages/bloge";
import NotFound from "./pages/notFound";

import store from "./redux";

const history = createBrowserHistory();

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router history={{history}}>
                <Routes>
                    <Route exact path="/" element={<App/>}/>
                    <Route exact path="/blog" element={<Blog/>}/>
                    <Route exact path="*" element={<NotFound/>}/>
                </Routes>
            </Router>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

