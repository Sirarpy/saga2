import {fork, spawn, call, all, delay} from 'redux-saga/effects'
import {loadBasicData} from "./initialSagas";

export default function* rootSaga() {
    const sagas = [loadBasicData]

    const retrySagas = yield sagas.map(saga => {
        return spawn(function* () {
            while (true) {
                try {
                    yield call(saga);
                    break
                } catch (e) {
                    console.log(e)
                }

            }
        })
    })
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
// fork(saga1);
// fork(saga2);
// fork(saga3);

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