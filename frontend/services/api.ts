import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; // Replace with your backend URL

export const fetchIngredients = async () => {
  const response = await axios.get(`${API_URL}/ingredients`);
  return response.data;
};

export const addIngredient = async (ingredient: object) => {
  const response = await axios.post(`${API_URL}/ingredients`, ingredient);
  return response.data;
};

export const deleteIngredient = async (id: string) => {
  const response = await axios.delete(`${API_URL}/ingredients/${id}`);
  return response.data;
};
