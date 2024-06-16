import axios, { AxiosError } from 'axios';
import { API_URL } from '../../constants/index.tsx';
import {
  RecipeCreateParameters,
  RecipeEditParameters,
} from '../../hooks/useRecipeApi.tsx';

export const recipesApis = {
  async getRecipeList() {
    try {
      const response = await axios.get(`${API_URL}/recipes`);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },

  async getRecipeQuery(query: string) {
    try {
      const response = await axios.get(`${API_URL}/recipes${query}`);
      return response.data;
    } catch (err: unknown) {
      const axiosError = err as AxiosError;

      if (axiosError.response && axiosError.response.status === 404) {
        return [];
      }
    }
  },

  async getRecipe(id: string, token: string | null) {
    try {
      if (token) {
        const response = await axios.get(`${API_URL}/recipes/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      } else {
        const response = await axios.get(`${API_URL}/recipes/${id}`);
        return response.data;
      }
    } catch (err) {
      console.error(err);
    }
  },

  async getRecipeByUserIdQuery(id: string, query: string | null) {
    try {
      const response = await axios.get(`${API_URL}/recipes/user/${id}${query}`);
      return response.data.data;
    } catch (err: unknown) {
      const axiosError = err as AxiosError;

      if (axiosError.response && axiosError.response.status === 404) {
        return [];
      }

      console.error(err);
      console.error(err);
    }
  },

  async deleteRecipe(id: string) {
    try {
      const reponse = await axios.delete(`${API_URL}/recipes/${id}`);
      return reponse.data;
    } catch (err) {
      console.error(err);
    }
  },

  async deleteRecipeByCheck(idList: string[]) {
    try {
      const reponse = await axios.delete(`${API_URL}/recipes/`, {
        data: {
          recipeIds: idList,
        },
      });
      return reponse.data;
    } catch (err) {
      console.error(err);
    }
  },

  async createRecipe(createData: RecipeCreateParameters) {
    try {
      const reponse = await axios.post(`${API_URL}/recipes/`, createData);
      return reponse.data;
    } catch (err) {
      console.error(err);
    }
  },

  async editRecipe(editData: RecipeEditParameters, id: string) {
    try {
      const reponse = await axios.put(`${API_URL}/recipes/${id}`, editData);
      return reponse.data;
    } catch (err) {
      console.error(err);
    }
  },
};
