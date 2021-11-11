import {all, call, delay, fork} from "redux-saga/effects";

function* auth() {
    yield delay(2000)
    return true;
}

function* loadUsers() {
    const request = yield call(fetch, 'https://swapi.dev/api/people')
    const data = yield call([request, request.json])
}

export default function* loadBasicData() {
    yield all([
        fork(auth),
        fork(loadUsers)
    ])
}