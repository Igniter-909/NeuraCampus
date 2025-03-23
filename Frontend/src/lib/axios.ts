import axios from 'axios';
import cookieUtils from './cookies.ts'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://cms-backend-kdb3.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add Authorization header
api.interceptors.request.use(async (config) => {
  // Get token from cookie
  const token = await cookieUtils.get('token');
  console.log(token);
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});