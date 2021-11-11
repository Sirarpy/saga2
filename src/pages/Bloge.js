import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

export default function Blog() {
    const blogData = useSelector(store => store.app.blog)
    console.log("blogData", blogData)
    const dispatch = useDispatch()

    return (
        <div>
            new blog page
            <button onClick={() => {
                dispatch({type: "LOAD_SOME_DATA"})
            }}>
                load data
            </button>
        </div>
    )
}