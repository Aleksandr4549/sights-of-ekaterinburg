import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import architectureReducer from './reducers/architecture-reducer';
import streetArtsReducer from './reducers/streetArts-reducer';
import articleReducer from './reducers/article-reducer';

const rootReducer = combineReducers({
  architecture: architectureReducer,
  streetArts: streetArtsReducer,
  article: articleReducer,
});

export type RootReducerType = typeof rootReducer;

export type StateType = ReturnType<RootReducerType>;

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
));

export default store;