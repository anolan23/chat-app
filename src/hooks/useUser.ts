import { useState, useEffect } from 'react';
import { User } from '../models/User';

export function useUser() {
  const user = new User();
  const [state, setState] = useState<User>(user);
  useEffect(() => {
    const start = async () => {
      const result = await user.autoLogin();
      setState(result);
    };
    start();
  }, []);

  return state;
}
