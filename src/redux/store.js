import {createStore,applyMiddleware,combineReducers} from 'redux';
import musicReducer from './musicReducer'
import thunk from 'redux-thunk';
import localstorageReducer from './localstorage/localstorageReducer';

const rootReducer=combineReducers({
    songs : musicReducer,
    playlist : localstorageReducer
  });
const store=createStore(rootReducer,applyMiddleware(thunk))

export default store;