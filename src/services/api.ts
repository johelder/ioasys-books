import axios from 'axios';

const namespace = 'api/v1';

export const api = axios.create({
  baseURL: `https://books.ioasys.com.br/${namespace}`,
  headers: {
    'Content-Type': 'application/json',
  },
});
