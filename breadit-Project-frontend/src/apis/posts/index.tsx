import axios, { AxiosError } from 'axios';
import { API_URL } from '../../constants/index.tsx';
import {
  PostCreateParameters,
  PostEditParameters,
} from '../../hooks/usePostApi.tsx';

export const postsApis = {
  async getPostList() {
    try {
      const response = await axios.get(`${API_URL}/posts`);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },

  async getPostQuery(query: string) {
    try {
      const response = await axios.get(`${API_URL}/posts${query}`);
      return response.data;
    } catch (err: unknown) {
      const axiosError = err as AxiosError;

      if (axiosError.response && axiosError.response.status === 404) {
        return [];
      }

      console.error(err);
    }
  },

  async getPost(id: string, token: string | null) {
    try {
      if (token) {
        const response = await axios.get(`${API_URL}/posts/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      } else {
        const response = await axios.get(`${API_URL}/posts/${id}`);
        return response.data;
      }
    } catch (err) {
      console.error(err);
    }
  },

  async getPostByUserIdQuery(id: string, query: string | null) {
    try {
      const response = await axios.get(`${API_URL}/posts/user/${id}${query}`);
      return response.data.data;
    } catch (err: unknown) {
      const axiosError = err as AxiosError;

      if (axiosError.response && axiosError.response.status === 404) {
        return [];
      }

      console.error(err);
    }
  },

  async deletePost(id: string) {
    try {
      const reponse = await axios.delete(`${API_URL}/posts/${id}`);
      return reponse.data;
    } catch (err) {
      console.error(err);
    }
  },

  async deletePostByCheck(idList: string[]) {
    try {
      const reponse = await axios.delete(`${API_URL}/posts/`, {
        data: {
          postIds: idList,
        },
      });
      return reponse.data;
    } catch (err) {
      console.error(err);
    }
  },

  async createPost(createData: PostCreateParameters) {
    try {
      const reponse = await axios.post(`${API_URL}/posts/`, createData);
      return reponse.data;
    } catch (err) {
      console.error(err);
    }
  },

  async editPost(editData: PostEditParameters, id: string) {
    try {
      const reponse = await axios.put(`${API_URL}/posts/${id}`, editData);
      return reponse.data;
    } catch (err) {
      console.error(err);
    }
  },
};
