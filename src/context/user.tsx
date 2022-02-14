import { createContext, useContext } from 'react';
import { useUser } from '../hooks/useUser';
import { User } from '../models/User';

const UserContext = createContext<User>(null);

export function UserProvider({ children }) {
  const user = useUser();

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export default function UserConsumer() {
  return useContext(UserContext);
}
