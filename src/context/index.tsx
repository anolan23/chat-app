import React, { createContext, useContext, useReducer } from 'react';
import { User, Channel, Action, Message } from '../types';
import reducers from '../reducers';

export interface State {
  user: User;
  channel: Channel;
  channels: Channel[];
  messages: Message[];
  showAddChannelPopup: boolean;
}

interface Props {
  children: React.ReactNode;
}

type Store = [State, React.Dispatch<Action>];

const initialState: State = {
  user: {},
  channel: {},
  channels: [],
  messages: [],
  showAddChannelPopup: false,
};

const StoreContext = createContext<Store>([initialState, () => null]);

export function UserProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducers, initialState);
  console.log(state);

  return (
    <StoreContext.Provider value={[state, dispatch]}>
      {children}
    </StoreContext.Provider>
  );
}

export default function useStore(): Store {
  return useContext(StoreContext);
}
