import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {getAction} from "connected-react-router";

function App() {
    const store = useSelector(store => store)

    return (
        <div>
            app
            <div>
                <Link to={'./blog'}>
                    new add page
                </Link>
            </div>
        </div>
    );
}

export default App;
