import axios, { AxiosResponse } from 'axios';
import { Credentials } from '../types/user';
import { UserProps } from '../models/User';

export async function getUsers() {
  try {
    const response = await axios.get('/api/users');
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getUser(id) {
  try {
    const response = await axios.get(`/api/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function updateUser(id, cols) {
  try {
    const response = await axios.patch(`/api/users/${id}`, cols);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updatePhoto(userId, photo) {
  try {
    const data = new FormData();
    data.append('photo', photo);
    const response = await axios.patch(`/api/users/${userId}/photo`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function signup(credentials: Credentials): Promise<UserProps> {
  try {
    const response = await axios.post<UserProps>('/api/signup', credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function login(credentials: Credentials): Promise<UserProps> {
  try {
    const response = await axios.post<UserProps>('/api/login', credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function logout() {
  try {
    const response = await axios.post('/api/logout');
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function autoLogin(): Promise<UserProps> {
  try {
    const response = await axios.get<UserProps>('/api/login');
    return response.data;
  } catch (error) {
    throw error;
  }
}
