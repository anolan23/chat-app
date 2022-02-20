import { State } from '../context';
import { Action } from '../types';
import userReducer from './userReducer';
import channelReducer from './channelReducer';

function combineReducers(
  ...reducers: any
): (state: State, action: Action) => State {
  return (state, action) =>
    reducers.reduce(
      (newState: State, reducer: any) => reducer(newState, action),
      state
    );
}

export default combineReducers(userReducer, channelReducer);
