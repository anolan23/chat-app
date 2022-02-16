import { useState, useEffect } from 'react';
import {
  autoLogin,
  login as apiLogin,
  logout as apiLogout,
  signup as apiSignup,
} from '../api';
import { Credentials, UserData, User } from '../types';

export function useUser(): User {
  const [data, setData] = useState<UserData>({ isSignedIn: false });

  useEffect(() => {
    (async function () {
      try {
        const user = await autoLogin();
        setData({ ...user, isSignedIn: true });
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const signup = async (credentials: Credentials): Promise<UserData> => {
    try {
      const user = await apiSignup(credentials);
      setData({ ...user, isSignedIn: true });
      return user;
    } catch (error) {
      throw error;
    }
  };

  const login = async (credentials: Credentials): Promise<UserData> => {
    try {
      const user = await apiLogin(credentials);
      setData({ ...user, isSignedIn: true });
      return user;
    } catch (error) {
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await apiLogout();
      setData({ isSignedIn: false });
    } catch (error) {
      throw error;
    }
  };

  return { data, setUser: setData, signup, login, logout };
}
