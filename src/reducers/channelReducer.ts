import { State } from '../context';
import { Action, ActionType } from '../types';
export default function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionType.setChannel:
      return { ...state, channel: action.payload };
    default:
      return state;
  }
}
