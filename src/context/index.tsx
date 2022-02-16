import { createContext, useContext } from 'react';
import { useUser } from '../hooks/useUser';
import { User } from '../types';

interface Store {
  user: User;
}

interface ProviderProps {
  children: React.ReactNode;
}

const StoreContext = createContext({} as Store);

export function UserProvider({ children }: ProviderProps) {
  const user = useUser();
  const store = {
    user,
  };

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}

export default function useStore(): Store {
  return useContext(StoreContext);
}
