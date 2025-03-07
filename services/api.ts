import axios from 'axios';

const API_URL = 'http://10.0.2.2:3000'; // Android emulator

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const loginUser = async (username: string, password: string) => {
  const response = await api.get('/users', {
    params: {
      username,
      password,
    },
  });
  
  const user = response.data.find(
    (u: any) => u.username === username && u.password === password
  );
  
  if (!user) {
    throw new Error('Invalid credentials');
  }
  
  return user;
};

export const signupUser = async (userData: { username: string; password: string }) => {
  const response = await api.post('/users', userData);
  return response.data;
};

export const getUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};
export const getCategories = async () => {
  const response = await api.get('/categories');
  return response.data;
};

export const getProductsByCategory = async (categoryId: number) => {
  const response = await api.get(`/products?categoryId=${categoryId}`);
  return response.data;
};

export default api;