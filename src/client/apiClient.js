import toast from 'react-hot-toast';

import axios from 'axios';
import queryString from 'qs';

const getToken = () => {
  const storedToken = window.localStorage.getItem('accessToken');

  return storedToken || null;
};

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_HOST,
  headers: {
    Accept: 'application/json'
  }
});

const showToastError = (error) => {
  const errors =
    error?.response?.data?.errors ||
    error?.response?.data?.title ||
    'Something went wrong';

  if (Array.isArray(errors)) {
    error?.response?.data?.errors?.map((error) => {
      const key = Object.keys(error)?.[0];
      toast.error(`${key} ${error?.[key]}`);
    });
  } else {
    toast.error(errors);
  }
};

client.interceptors.request.use(
  function (config) {
    // Serialize the parameteters
    config.paramsSerializer = (params) => {
      return queryString.stringify(params, { indices: false });
    };

    const token = getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    // Do something with response error
    showToastError(error);

    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response;
  },
  function (error) {
    // Do something with response error
    const withToastError = error?.config?.withToastError ?? true;

    withToastError && showToastError(error);

    return Promise.reject(error);
  }
);

export default client;
