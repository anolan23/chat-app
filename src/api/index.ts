import axios from 'axios';

import { User } from '../types';

export async function fetchUser(id: number) {
  try {
    const response = await axios.get<User>(`/api/users/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
