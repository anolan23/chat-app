import { createContext, useContext } from 'react';
import { useUser } from '../hooks/useUser';
import { User } from '../types';

interface Store {
  user: User;
}

const UserContext = createContext<Store>(null);

export function UserProvider({ children }) {
  const user = useUser();
  const store = {
    user,
  };

  return <UserContext.Provider value={store}>{children}</UserContext.Provider>;
}

export default function UserConsumer(): Store {
  return useContext(UserContext);
}
