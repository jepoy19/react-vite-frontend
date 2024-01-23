import axios from "axios";

const NODE_ENV = import.meta.env.VITE_NODE_ENV || "development";

const uri = {
  development: import.meta.env.VITE_API_DEVELOPMENT,
  production: import.meta.env.VITE_API_PRODUCTION,
};

const request = axios.create({
  baseURL: uri[NODE_ENV],
  timeout: 30000,
});

export const ItemService = {
  createItem: async (params) => {
    try {
      const reponse = await request.post("/create", params);
      return reponse.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  getAllItems: async () => {
    try {
      const response = await request.get("/item");
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  updateItem: async (params) => {
    try {
      const response = await request.patch(`/item/${params.id}`, params);
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  deleteItem: async (id) => {
    try {
      const response = await request.delete(`/item/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
};
