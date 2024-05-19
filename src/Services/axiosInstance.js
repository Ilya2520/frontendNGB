import axios from 'axios';
import { BASE_URL } from '../constants';

const instance = axios.create({
   withCredentials: true,
   baseURL: BASE_URL
});

export default instance;