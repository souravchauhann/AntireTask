import axios from 'axios';

const BASE_URL = 'https://dummyjson.com';

export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/products/categories`);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};

export const fetchProductsByCategory = async (category, items) => {
  try {
    const response = await axios.get(`${BASE_URL}/products/category/${category}?limit=20&skip=${items}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching products for category ${category}:`, error);
  }
};

export const fetchAllProducts = async (items) => {
  try {
    const response = await axios.get(`${BASE_URL}/products?limit=20&skip=${items}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all products:', error);
  }
};

export const searchProducts = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/products/search?q=${query}`);
    return response.data;
  } catch (error) {
    console.error('Error searching for products:', error);
  }
};
