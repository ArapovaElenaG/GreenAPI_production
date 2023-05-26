import reducer from './reducer';
import { createStore } from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const reducerPersistConfig = {
    key: 'root',
    storage,
    whitelist: ['chats']
}

const persistedReducer = persistReducer(reducerPersistConfig, reducer)

let store = createStore(
    // reducer,
    persistedReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export let persistor = persistStore(store)


export default store;