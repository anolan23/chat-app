import React, { createContext, useContext, useReducer } from 'react';
import { io, Socket } from 'socket.io-client';

import { User, Channel, Action, Message, SidebarMode } from '../types';
import reducers from '../reducers';

interface ServerToClientEvents {
  message: (message: Message, callback: (message: Message) => void) => void;
  action: (message: string) => void;
  members: (members: User[]) => void;
}

interface ClientToServerEvents {
  sendMessage: (message: Message, callback: (error: string) => void) => void;
  join: (
    user: User,
    channelId: number,
    callback: (error: string) => void
  ) => void;
}

export interface State {
  user: User;
  channel: Channel;
  members: User[];
  channels: Channel[];
  messages: Message[];
  showAddChannelPopup: boolean;
  showSidebar: boolean;
  mode: SidebarMode;
  socket: Socket<ServerToClientEvents, ClientToServerEvents>;
}

interface Props {
  children: React.ReactNode;
}

type Store = [State, React.Dispatch<Action>];

const initialState: State = {
  user: {},
  channel: {},
  members: [],
  channels: [],
  messages: [],
  showAddChannelPopup: false,
  showSidebar: false,
  mode: SidebarMode.channelList,
  socket: io(),
};

const StoreContext = createContext<Store>([initialState, () => null]);

export function UserProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducers, initialState);

  return (
    <StoreContext.Provider value={[state, dispatch]}>
      {children}
    </StoreContext.Provider>
  );
}

export default function useStore(): Store {
  return useContext(StoreContext);
}
