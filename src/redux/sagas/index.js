import {fork, spawn, call, all, take, takeLatest, cancel, actionChannel} from 'redux-saga/effects'
import loadBasicData from "./initialSagas";
import pageLoaderSaga from "./pageLoader";

// take + fork simple pattern in redux saga
// loadOnAction saga to watcher and worker


//*********************** actionChannel ****************************

export function* fetchPlanets() {
    //   than dispatch some data
    // console.log("type: LOAD_SOME_DATA")
    const response = yield call(
        fetch,
        'https://swapi.dev/api/planets');
    const data = yield call([response, response.json])
    // console.log(" data-", data)
}

//*********************** AbortController ****************************
//
// export function* fetchPlanets(signal) {
//     //   than dispatch some data
//     // console.log("type: LOAD_SOME_DATA")
//     const response = yield call(
//         fetch,
//         'https://swapi.dev/api/planets',
//         {signal});
//     const data = yield call([response, response.json])
//     // console.log(" data-", data)
// }
//***************************************************

// take  + call is not best practice
// that's why we
export function* loadOnAction() {
    // in case we want tasks done after by after
    // use actionChannel


    // actionChannel like buffer
    const channel = yield actionChannel('LOAD_SOME_DATA')

    while (true) {
        yield take(channel)
        // console.log("click")
        yield call(fetchPlanets)
    }

// *******************************
    // // cancel for stop task
    // let task;
    // // AbortController stops fetch requests
    // let abortController = new AbortController()
    //
    // while (true) {
    //     yield take('LOAD_SOME_DATA')
    //     if (task) {
    //         abortController.abort();
    //         yield cancel(task)
    //         abortController = new AbortController()
    //     }
    //     task = yield fork(fetchPlanets, abortController.signal)
    // }

// *******************************

    // instead of fork if we want to wait for une request, use takeLatest
    // replace while to takeLatest

    //takeLatest is fun but in order to stop request on every click
    //we have to write our own logic
    // in order to stop rendering

    // yield takeLatest('LOAD_SOME_DATA', fetchPlanets)

    // while (true) {
    //     //  at first take action type
    //     yield take('LOAD_SOME_DATA')
    //
    //     // all actions will work parallel
    //     yield fork(fetchPlanets)
    // }
}

export default function* rootSaga() {

    const sagas = [
        loadBasicData,
        pageLoaderSaga,
        loadOnAction
    ]

    const retrySagas = yield sagas.map(saga => {
        return spawn(function* () {
            while (true) {
                try {
                    // call blocked method
                    yield call(saga);
                    break;
                } catch (e) {
                    console.log(e)
                }
            }
        })
    })

    // runs all tasks parallel
    // if there is one blocked task, all will be blocked
    yield all(retrySagas)
}


// //*********************************************************
// export function* saga1() {console.log("1")}
// export function* saga2() {console.log("2")}
// export function* saga3() {console.log("3")}

// export default function* rootSaga() {
// yield [
// // 1- first way
// saga1(),
// saga2(),
// saga3(),
// ]

//  // 2-  second
// yield [
// fork(saga1);
// fork(saga2);
// fork(saga3);
// ]

// or

// // 3- third way
// fork depends on parent tasks
// yield fork(saga1);  //auth
// yield fork(saga2);  // users
// yield fork(saga3);  // payments

// spawn don't depends on parent tasks
// in any saga fail all other sagas will work
// yield spawn(saga1)  //auth
// yield spawn(saga2)  // users
// yield spawn(saga3) // payments

// const sagas = [saga1, saga2, saga3]
//
// const retrySagas = sagas.map(saga => {
//     return spawn(function* () {
//         while (true) {
//             try {
//                 yield call(saga);
//                 break;
//             } catch (e) {
//                 console.log(e)
//             }
//         }
//     })
// })
//parallel runs all tasks
// wait for all sagas bee done
// if any error some of them, it will stop
// lice promise all
// yield  all(retrySagas)
// }