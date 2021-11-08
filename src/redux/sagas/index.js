import {take, takeEvery, put, call, fork, spawn, join, select, takeLatest, takeLeading} from 'redux-saga/effects'

// 3. EFFECTS
// helper functions that create simple objects
// objects include there instructions
// effect is the middleware that waite for dispatch, after that it creates

// const wait = (t)=> new Promise((resolve => {
//      setTimeout(resolve, t)
// }))

async function swapiGet(pattern) {
    const request = await fetch(`https://swapi.dev/api/${pattern}`);
    const data = await request.json()
    return data
}

// 2. SAGA WORKER
// HERE ALL BUSINESS LOGIC
// REQUESTS, CACHE, WORK WITH BROWSER API
// ANG OTHER ASYNC ACTIONS

export function* loadPeople() {
    // throw new Error()
    const people = yield call(swapiGet, 'people')
    console.log("load people")
    yield put({type: 'SET_PEOPLE', payload: people.results})
    return people
}

export function* loadPlanets() {
    const planets = yield  call(swapiGet, 'planets')
    console.log("load planets")
    yield put({type: 'SET_PLANETS', payload: planets.results})
}

export function* workerSaga() {
    // // at first will wait
    // yield wait(1000)
    // // than console log
    // console.log("action after - click")
    //
    //  instead of this -   const data = yield getPeople();
    //with call we cal pass props
    //call waits for the getPeople f creation
    // call is blocked effect
    // stops effect saga till the promise done

    // console.log(data)
    // like dispatch
    // const people = yield call(swapiGet, 'people')
    // console.log(people)
    // yield put({type: 'SET_PEOPLE', payload: people.results})
    //
    // const planets = yield call(swapiGet, 'planets')
    // console.log(planets)
    // yield put({type: 'SET_PLANETS', payload: planets.results})
    console.log("start")
    // fork does not stop code
    // call stops

    //spawn will stop actions, blocked after actios
    // yield fork(loadPeople)
    // yield fork(loadPlanets)

    //spawn will not  stop actions, non blocked
    // yield spawn(loadPeople)

    // people creates saga inside
    // const task = yield  fork(loadPeople)

    yield call(loadPeople)
    yield call(loadPlanets)

    // join line force
    // const people = yield join(task)
    // yield call(loadPeople)
    // yield call(loadPlanets)
    // console.log("people - ", people)
    console.log("end")

    // access to store after calls
    const store = yield select(s => s)
    console.log('store', store)

}

//  1. SAGA WATCHER
// WATCH TO THE SOME ACTIONS CHANGE
//  dispatchi popoxutyann e hetevum and run worker
// HERE ACTIONS
export function* watchLoadDataSaga() {
    // while (true) {
    //     yield  take("click")
    //
    //     yield workerSaga();
    // }

    // instead of while we use takeEvery
    // action name / and action

    // yield takeEvery('click', workerSaga)
    // yield takeLatest('click', workerSaga)
    //takeEvery and call is blocked effects
    // takeEvery stops saga and wait for creation saga` click
    yield takeEvery('LOAD_DATA', workerSaga)


}

// RUNS WATCHER
export default function* rootSaga() {
    yield fork(watchLoadDataSaga);
    // console.log("saga")
}