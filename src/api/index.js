import axios from 'axios';

export async function getUsers() {
  try {
    const response = await axios.get('/api/users');
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function signup(user) {
  try {
    const response = await axios.post('/api/signup', user);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function login(user) {
  try {
    const response = await axios.post('/api/login', user);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
