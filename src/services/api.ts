import axios from 'axios';

const namespace = 'api/v1';

export const api = axios.create({
  baseURL: `https://books.ioasys.com.br/${namespace}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  response => response,
  async error => {
    if (axios.isCancel(error)) {
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !error.config.data) {
      const response = await api.post('/auth/refresh-token', {
        refreshToken: error.config.headers.Authorization,
      });

      const {
        Authorization: newAuthorization,
        ['refresh-token']: newRefreshToken,
      } = response.data;

      error.config.headers.Authorization = newAuthorization;
      error.config.headers['refresh-token'] = newRefreshToken;

      return Promise.resolve(response);
    }
  },
);
