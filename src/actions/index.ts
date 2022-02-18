import React from 'react';
import axios from 'axios';

import { Credentials } from '../types/user';
import { Action, ActionType, User } from '../types';

export function fetchUser(dispatch: React.Dispatch<Action>) {
  return async (id: number) => {
    try {
      const response = await axios.get<User>(`/api/users/${id}`);
      dispatch({ type: ActionType.fetchUser, payload: response.data });
    } catch (error) {
      throw error;
    }
  };
}

export function updateUser(dispatch: React.Dispatch<Action>) {
  return async (id: number, cols: any) => {
    try {
      const response = await axios.patch<User>(`/api/users/${id}`, cols);
      dispatch({ type: ActionType.updateUser, payload: response.data });
    } catch (error) {
      throw error;
    }
  };
}

export function updatePhoto(dispatch: React.Dispatch<Action>) {
  return async (userId: number, photo: File) => {
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
  };
}

export function signup(dispatch: React.Dispatch<Action>) {
  return async (credentials: Credentials) => {
    try {
      const response = await axios.post<User>('/api/signup', credentials);
      dispatch({ type: ActionType.signup, payload: response.data });
    } catch (error) {
      throw error;
    }
  };
}

export function login(dispatch: React.Dispatch<Action>) {
  return async (credentials: Credentials) => {
    try {
      const response = await axios.post<User>('/api/login', credentials);
      dispatch({ type: ActionType.login, payload: response.data });
    } catch (error) {
      throw error;
    }
  };
}

export function logout(dispatch: React.Dispatch<Action>) {
  return async () => {
    try {
      const response = await axios.post('/api/logout');
      dispatch({ type: ActionType.logout, payload: response.data });
    } catch (error) {
      throw error;
    }
  };
}

export function autoLogin(dispatch: React.Dispatch<Action>) {
  return async () => {
    try {
      const response = await axios.get<User>('/api/login');
      dispatch({ type: ActionType.autoLogin, payload: response.data });
    } catch (error) {
      throw error;
    }
  };
}
