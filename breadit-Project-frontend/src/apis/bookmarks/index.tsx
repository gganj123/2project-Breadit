import axios from 'axios';
import { API_URL } from '../../constants/index.tsx';

export const bookmarksApis = {
  async postMagazineBookmarkToggle(
    userId: string,
    postId: string,
    location: string
  ) {
    try {
      const response = await axios.post(
        `${API_URL}/bookmarks/magazinebooktoggle`,
        {
          user_id: userId,
          post_id: postId,
          location: location,
        }
      );

      return response.data;
    } catch (err) {
      console.error(err);
    }
  },

  async postPostBookmarkToggle(
    userId: string,
    postId: string,
    location: string
  ) {
    try {
      const response = await axios.post(`${API_URL}/bookmarks/postbooktoggle`, {
        user_id: userId,
        post_id: postId,
        location: location,
      });

      return response.data;
    } catch (err) {
      console.error(err);
    }
  },

  async postRecipeBookmarkToggle(
    userId: string,
    postId: string,
    location: string
  ) {
    try {
      const response = await axios.post(
        `${API_URL}/bookmarks/recipebooktoggle`,
        {
          user_id: userId,
          post_id: postId,
          location: location,
        }
      );

      return response.data;
    } catch (err) {
      console.error(err);
    }
  },

  async getMagazineQuery(query: string) {
    try {
      const response = await axios.get(`${API_URL}/magazines?${query}`);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },

  async getBookmarkByUserId(userId: string, query: string | null) {
    try {
      const response = await axios.get(
        `${API_URL}/bookmarks/${userId}${query}`
      );
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },
};
