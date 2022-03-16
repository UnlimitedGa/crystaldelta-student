import { API_URL} from './config';
import axios from 'axios';
import LocalStorageService from './LocalStorageService';
import { createBrowserHistory } from 'history';

const URL = API_URL;
const instance = axios.create({
  baseURL: URL,
});

const history = createBrowserHistory();

instance.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
instance.defaults.headers.common['Cache-Control'] = 'no-cache';
instance.defaults.headers.common['Pragma'] = 'no-cache';
instance.defaults.headers.common['Expires'] = '0';

instance.interceptors.request.use(
  (config) => {
    const token = LocalStorageService.getAccessToken();
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    const userId = LocalStorageService.getUserId();
    if (userId) {
      config.headers['_user_id'] = userId;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
instance.interceptors.response.use(
  (response) => {
    const originalRequest = response.config;
    if (
      response.data.status &&
      ['sign-in'].includes(originalRequest.url)
    ) {
      const tokenObject = {
        access_token: response.data.data.tokens.access.token,
        refresh_token: response.data.data.tokens.refresh.token,
        user_id: response.data.data._id,
      };
      LocalStorageService.setToken(tokenObject);
      instance.defaults.headers.common['Authorization'] =
        'Bearer ' + LocalStorageService.getAccessToken();
      instance.defaults.headers.common[
        'user_id'
      ] = LocalStorageService.getUserId();
      return response;
    }
    return response;
  },
  function (error) {
    console.log('error',error.response)
    if (
      error.response.status !== undefined &&
      error.response.status === 401 
    ) {
      alert('Your session has timed out. Please login again.');
      localStorage.clear();
      history.push('/sign-in');
      window.location.reload(true);
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default instance;
