import axios from 'axios';

const baseURL =
  import.meta.env.VITE_API_BASE_URL || 'https://olco-urology-faly90wzj-cocoshs-projects.vercel.app/api';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
