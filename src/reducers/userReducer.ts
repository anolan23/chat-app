import { State } from '../context';
import { Action, ActionType } from '../types';
export default function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionType.signup:
      return { ...state, user: action.payload };
    case ActionType.autoLogin:
      return { ...state, user: action.payload };
    case ActionType.login:
      return { ...state, user: action.payload };
    case ActionType.logout:
      return { ...state, user: { isSignedIn: false } };
    case ActionType.updateUser:
      return { ...state, user: action.payload };
    case ActionType.updatePhoto:
      return { ...state, user: action.payload };
    default:
      return state;
  }
}
