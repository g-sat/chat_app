import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Use 10.0.2.2 for Android emulator to access localhost
const API_URL = 'http://10.0.2.2:8000/api';

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add token to requests
api.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  },
);

export const authService = {
  async signUp(userData: {
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
  }) {
    try {
      console.log('Signing up with data:', userData);
      const response = await api.post('/auth/signup', userData);
      const {token} = response.data;
      await AsyncStorage.setItem('token', token);
      return response.data;
    } catch (error: any) {
      console.error('Signup error:', error.response?.data || error.message);
      throw error;
    }
  },

  async signIn(username: string, password: string) {
    try {
      console.log('Attempting sign in for username:', username);
      const response = await api.post('/auth/signin', {username, password});
      console.log('Sign in response:', response.data);
      const {token} = response.data;
      await AsyncStorage.setItem('token', token);
      return response.data;
    } catch (error: any) {
      console.error('Sign in error:', error.response?.data || error.message);
      throw error;
    }
  },

  async signOut() {
    try {
      await AsyncStorage.removeItem('token');
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  },

  async getCurrentUser() {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error: any) {
      console.error(
        'Get current user error:',
        error.response?.data || error.message,
      );
      throw error;
    }
  },
};

export default api;
