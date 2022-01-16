import axios from 'axios';

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

export async function signup(user) {
  try {
    const response = await axios.post('/api/signup', user);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function login(user) {
  try {
    const response = await axios.post('/api/login', user);
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

export async function autoLogin() {
  try {
    const response = await axios.get('/api/login');
    return response.data;
  } catch (error) {
    throw error;
  }
}
