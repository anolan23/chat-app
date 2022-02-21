import { State } from '../context';
import { Action, ActionType } from '../types';
export default function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionType.setChannel:
      return { ...state, channel: action.payload };
    case ActionType.createChannel:
      return {
        ...state,
        channel: action.payload,
        channels: [...state.channels, action.payload],
      };
    case ActionType.fetchAllChannels:
      return { ...state, channels: action.payload };
    default:
      return state;
  }
}