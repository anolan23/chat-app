import { createContext, useContext } from 'react';
import { useUser } from '../hooks/useUser';

const UserContext = createContext({});

export function UserProvider({ children }) {
  const user = useUser();
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export default function UserConsumer() {
  return useContext(UserContext);
}
