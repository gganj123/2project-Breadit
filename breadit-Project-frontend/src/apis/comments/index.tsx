import axios from 'axios';
import { API_URL } from '../../constants/index.tsx';
import { CreateCommentParameters } from '../../hooks/useCommentApi.tsx';

export const commentsApis = {
  async getCommentListByPostId(id: string) {
    try {
      const response = await axios.get(`${API_URL}/comments?post_id=${id}`);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },

  async deleteComment(id: string) {
    try {
      const reponse = await axios.delete(`${API_URL}/comments/${id}`);
      return reponse.data;
    } catch (err) {
      console.error(err);
    }
  },

  async createComment(commentData: CreateCommentParameters) {
    try {
      const response = await axios.post(`${API_URL}/comments/`, commentData);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },

  async editComment(id: string, editData: string) {
    try {
      const response = await axios.put(`${API_URL}/comments/${id}`, {
        content: editData,
      });
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },
};
