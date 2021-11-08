import React from "react";
import {useDispatch, useSelector} from "react-redux";

function App() {
    const store = useSelector(store => store)
    const dispatch = useDispatch()
    console.log(store)

    return (
        <div>
            app
        </div>
    );
}

export default App;
