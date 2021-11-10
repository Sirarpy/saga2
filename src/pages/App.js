import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";

function App() {
    const store = useSelector(store => store)
    const dispatch = useDispatch()
    console.log("store - ", store)

    return (
        <div>
            app
            <div>
                <Link to={'./blog'}>
                    open blog
                </Link>
            </div>
        </div>
    );
}

export default App;
