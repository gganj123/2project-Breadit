import axios from 'axios';
import { API_URL } from '../../constants/index.tsx';

export const likesApis = {
  async postMagazineLikeToggle(userId: string, postId: string) {
    try {
      const response = await axios.post(`${API_URL}/likes/magazinetoggle`, {
        user_id: userId,
        post_id: postId,
      });

      return response.data;
    } catch (err) {
      console.error(err);
    }
  },

  async postPostLikeToggle(userId: string, postId: string) {
    try {
      const response = await axios.post(`${API_URL}/likes/posttoggle`, {
        user_id: userId,
        post_id: postId,
      });

      return response.data;
    } catch (err) {
      console.error(err);
    }
  },

  async postRecipeLikeToggle(userId: string, postId: string) {
    try {
      const response = await axios.post(`${API_URL}/likes/recipetoggle`, {
        user_id: userId,
        post_id: postId,
      });

      return response.data;
    } catch (err) {
      console.error(err);
    }
  },
};
