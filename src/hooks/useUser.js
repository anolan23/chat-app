import { useState, useEffect } from 'react';
import {
  autoLogin,
  login as apiLogin,
  logout as apiLogout,
  signup as apiSignup,
} from '../api';

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

  const signup = async ({ email, password }) => {
    try {
      const user = await apiSignup({ email, password });
      setUser(user);
      return user;
    } catch (error) {
      throw error;
    }
  };

  const login = async ({ email, password }) => {
    try {
      const user = await apiLogin({ email, password });
      setUser(user);
      return user;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await apiLogout();
      setUser({});
    } catch (error) {
      throw error;
    }
  };

  return { user, setUser, signup, login, logout };
}
