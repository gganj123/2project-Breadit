import axios from 'axios';
import { API_URL } from '../../constants/index.tsx';
import {
  MagazineCreateParameters,
  MagazineEditParameters,
} from '../../hooks/useMagazineApi.tsx';

export const magazinesApis = {
  async getMagazineList() {
    try {
      const response = await axios.get(`${API_URL}/magazines`);
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

  async getMagazine(id: string, token: string | null) {
    try {
      if (token) {
        const response = await axios.get(`${API_URL}/magazines/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      } else {
        const response = await axios.get(`${API_URL}/magazines/${id}`, {});
        return response.data;
      }
    } catch (err) {
      console.error(err);
    }
  },

  async deleteMagazine(id: string) {
    try {
      const response = await axios.delete(`${API_URL}/magazines/${id}`);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },

  async deleteMagazineByCheck(idList: string[]) {
    try {
      const reponse = await axios.delete(`${API_URL}/magazines/`, {
        data: {
          postIds: idList,
        },
      });
      return reponse.data;
    } catch (err) {
      console.error(err);
    }
  },

  async createMagazine(createData: MagazineCreateParameters) {
    try {
      const reponse = await axios.post(`${API_URL}/magazines/`, createData);
      return reponse.data;
    } catch (err) {
      console.error(err);
    }
  },

  async editMagazine(editData: MagazineEditParameters, id: string) {
    try {
      const reponse = await axios.put(`${API_URL}/magazines/${id}`, editData);
      return reponse.data;
    } catch (err) {
      console.error(err);
    }
  },
};
