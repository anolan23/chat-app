import { createContext, useContext, useMemo } from 'react';
import { useUser } from '../hooks/useUser';

const UserContext = createContext({});

export function UserProvider({ children }) {
  const user = useUser();
  const memoized = useMemo(() => {
    return user;
  }, [user]);
  return (
    <UserContext.Provider value={memoized}>{children}</UserContext.Provider>
  );
}

export default function UserConsumer() {
  return useContext(UserContext);
}
