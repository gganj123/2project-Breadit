import axios from 'axios';
import { API_URL } from '../../constants/index.tsx';

export const usersApi = {
  async getUserList() {
    try {
      const response = await axios.get(`${API_URL}/users`);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },

  async deleteUser(id: string) {
    try {
      const reponse = await axios.delete(`${API_URL}/users/${id}`);
      return reponse.data;
    } catch (err) {
      console.error(err);
    }
  },
};
