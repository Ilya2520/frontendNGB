import axios from 'axios';
import { BASE_URL } from '../constants';
import Cookies from 'js-cookie';

const instance = axios.create({
   baseURL: BASE_URL,
   withCredentials: true,
 });
 
 instance.interceptors.request.use((config) => {
   const token = Cookies.get('BEARER');
   console.log(token);
   if (token) {
      Cookies.set('BEARER',token);
     config.headers.Authorization = `Bearer ${token}`;
   }
   return config;
 }, (error) => {
   return Promise.reject(error);
 });
 
 export default instance;