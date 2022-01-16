import { useState, useEffect } from 'react';
import { autoLogin, login as apiLogin, logout as apiLogout } from '../api';

export function useUser() {
  const [user, setUser] = useState({});
  useEffect(() => {
    (async function () {
      try {
        const user = await autoLogin();
        setUser(user);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const login = async ({ email, password }) => {
    return apiLogin({ email, password });
  };

  const logout = async () => {
    return apiLogout();
  };

  return { user, setUser, login, logout };
}
