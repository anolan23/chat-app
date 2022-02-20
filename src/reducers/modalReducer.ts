import { State } from '../context';
import { Action, ActionType } from '../types';
export default function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionType.setShowAddChannelPopup:
      return { ...state, showAddChannelPopup: action.payload };
    default:
      return state;
  }
}
