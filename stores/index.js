// configuration for sagas and redux store for API intergration

import { createStore, applyMiddleware, combineReducers } from 'redux'; //redux-store
import createSagaMiddleware from 'redux-saga' //saga middleware
import rootSaga from '../sagas/index';
import reducer from '../reducers/reducer';
// import yourGoalReducer from '../reducers/YourGoalReducer';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducer,
  // combineReducers({reducer:reducer,yourGoalReducer:yourGoalReducer}),
  applyMiddleware(sagaMiddleware)
  )
  

sagaMiddleware.run(rootSaga)

export default store;