import React, { createContext, useContext, useReducer } from 'react';
import { io, Socket } from 'socket.io-client';

import { User, Channel, Action, Message } from '../types';
import reducers from '../reducers';

interface ServerToClientEvents {
  message: (message: Message, callback: (message: Message) => void) => void;
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

interface ClientToServerEvents {
  sendMessage: (message: Message, callback: (error: string) => void) => void;
  hello: () => void;
}

export interface State {
  user: User;
  channel: Channel;
  channels: Channel[];
  messages: Message[];
  showAddChannelPopup: boolean;
  socket: Socket<ServerToClientEvents, ClientToServerEvents>;
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
  socket: io(),
};

const StoreContext = createContext<Store>([initialState, () => null]);

export function UserProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducers, initialState);
  // console.log(state);

  return (
    <StoreContext.Provider value={[state, dispatch]}>
      {children}
    </StoreContext.Provider>
  );
}

export default function useStore(): Store {
  return useContext(StoreContext);
}
