import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  
  failedQueue = [];
};

function checkTokenExpiration(token) {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp <= currentTime + 300;
  } catch (error) {
    return true;
  }
}

export const createApiClient = (baseURL, tokenPrefix = 'access', refreshTokenPrefix = 'refresh') => {
  const ApiClient = axios.create({
    baseURL: baseURL,
    headers: {
      'Content-Type': 'multipart/form-data',
      'Accept': 'application/json'
    }
  });

  ApiClient.interceptors.request.use(
    async (config) => {
      const token = Cookies.get(tokenPrefix);

      const refreshAccessToken = () => {
        return new Promise((resolve, reject) => {
          if (isRefreshing) {
            failedQueue.push({ resolve, reject });
            return;
          }

          isRefreshing = true;

          ApiClient.post('api/token/refresh/', {
            [refreshTokenPrefix === 'refresh' ? 'refresh' : 'refresh_token']: Cookies.get(refreshTokenPrefix)
          })
          .then(({ data }) => {
            const newToken = data.access;
            
            Cookies.set(tokenPrefix, newToken, {
              expires: 7,
              secure: true,
              sameSite: 'strict'
            });

            processQueue(null, newToken);
            resolve(newToken);
          })
          .catch((error) => {
            processQueue(error, null);
            Cookies.remove(tokenPrefix);
            Cookies.remove(refreshTokenPrefix);
            reject(error);
          })
          .finally(() => {
            isRefreshing = false;
          });
        });
      };

      if (token) {
        const isTokenExpired = checkTokenExpiration(token);

        if (isTokenExpired) {
          try {
            const newToken = await refreshAccessToken();
            config.headers.Authorization = `Bearer ${newToken}`;
          } catch (refreshError) {
            return Promise.reject(refreshError);
          }
        }
      }

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  ApiClient.interceptors.response.use(
    (response) => response.data,
    (error) => Promise.reject(error)
  );

  return ApiClient;
};

// Usage
export const AdminApi = createApiClient('https://alpha002.pythonanywhere.com/', 'adminAccess', 'adminRefresh');
export const ClientApi = createApiClient('https://alpha002.pythonanywhere.com/', 'access', 'refresh');