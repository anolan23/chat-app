import { useState, useEffect } from 'react';
import { User } from '../models/User';

export function useUser(): User {
  const user = new User();
  const [state, setState] = useState<User>(user);
  useEffect(() => {
    const start = async () => {
      try {
        await user.autoLogin();
        setState(user);
      } catch (error) {
        user.set({ isSignedIn: false });
        setState(user);
        console.error(error, 'awdawdadwd');
      }
    };
    start();
  }, []);

  return state;
}
