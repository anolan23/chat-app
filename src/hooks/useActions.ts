import useStore from '../context';
import axios from 'axios';

import { Credentials } from '../types/user';
import { ActionType, User } from '../types';

export function useActions() {
  const [, dispatch] = useStore();

  async function login(
    credentials: Credentials,
    callback: (user: User) => void
  ) {
    try {
      const response = await axios.post<User>('/api/login', credentials);
      dispatch({ type: ActionType.login, payload: response.data });
      callback(response.data);
    } catch (error) {
      throw error;
    }
  }

  async function updateUser(id: number, cols: any) {
    try {
      const response = await axios.patch<User>(`/api/users/${id}`, cols);
      dispatch({ type: ActionType.updateUser, payload: response.data });
    } catch (error) {
      throw error;
    }
  }

  async function updatePhoto(userId: number, photo: File) {
    try {
      const data = new FormData();
      data.append('photo', photo);
      const response = await axios.patch<User>(
        `/api/users/${userId}/photo`,
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      dispatch({ type: ActionType.updatePhoto, payload: response.data });
    } catch (error) {
      throw error;
    }
  }

  async function signup(credentials: Credentials) {
    try {
      const response = await axios.post<User>('/api/signup', credentials);
      dispatch({ type: ActionType.signup, payload: response.data });
    } catch (error) {
      throw error;
    }
  }

  async function logout() {
    try {
      const response = await axios.post('/api/logout');
      dispatch({ type: ActionType.logout, payload: response.data });
    } catch (error) {
      throw error;
    }
  }

  async function autoLogin() {
    try {
      const response = await axios.get<User>('/api/login');
      dispatch({ type: ActionType.autoLogin, payload: response.data });
    } catch (error) {
      throw error;
    }
  }

  return {
    autoLogin,
    updateUser,
    updatePhoto,
    signup,
    login,
    logout,
  };
}
