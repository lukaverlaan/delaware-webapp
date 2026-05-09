import axiosRoot from 'axios';
import { JWT_TOKEN_KEY } from '../contexts/auth';

const baseUrl = import.meta.env.VITE_API_URL;

export const axios = axiosRoot.create({
    baseURL: baseUrl,
});

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem(JWT_TOKEN_KEY);

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(JWT_TOKEN_KEY);
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export async function getAll(url) {
    const { data } = await axios.get(url);
    return data.items;
}

export async function getBySiteId(url) {
    const { data } = await axios.get(url);
    return data.items;
}

export async function getById(url) {
    const { data } = await axios.get(url);
    return data;
}

export const deleteById = async (url, { arg: id }) => {
    await axios.delete(`${url}/${id}`);
};

export const post = async (url, { arg }) => {
    const { data } = await axios.post(url, arg);
    return data;
};

export async function save(url, { arg: { id, ...data } }) {
    await axios({
        method: id ? 'PATCH' : 'POST',
        url: `${url}/${id ?? ''}`,
        data,
    });
}

export const markNotifAsRead = async (url, { arg: id }) => {
    await axios.patch(`${url}/${id}/read`);
};