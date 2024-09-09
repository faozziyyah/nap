import axios from 'axios';

const AUTH_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default axios.create({
  baseURL: AUTH_BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: AUTH_BASE_URL,
  headers: { 'Content-Type': 'application/json' }, // Default content type
});
