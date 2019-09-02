import { createStore, Store, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';


import createSagaMiddleware from 'redux-saga';

import rootReducer from './ducks/rootReducer';
import rootSaga from './ducks/rootSaga';

import { ApplicationState } from './../models'


const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = composeWithDevTools({ trace: true, traceLimit: 25 });


const store: Store<ApplicationState> = createStore(
    rootReducer, 
    composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);


export default store;
