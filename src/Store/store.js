import reducer from './reducer';
import { createStore } from 'redux';




// стандартная запись без библиотек
// // если есть в local storage стейт, то достаем его
// const persistedState = localStorage.getItem('reduxState') 
//                        ? JSON.parse(localStorage.getItem('reduxState'))
//                        : {}

const store = createStore(
    reducer, 
    // persistedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)




// использование библиотека redux-persist для сохранения в localStorage
// import {persistStore, persistReducer} from 'redux-persist';
// import storage from 'redux-persist/lib/storage';






// export const persistor = persistStore (store);


export default store;