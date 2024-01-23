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

export const UserService = {
    logIn: async (email, password) => {
        try {
          const result = await request.post('/login/', email, password)
          if(result.data === "Success"){
            return true
          }
          return false
        } catch (error) {
          console.log(error)
        }
    },
    register : async(params) => {
        try {
          const result = await request.post('/user/', params)
          return result.data
        } catch (error) {
          console.log(error)
        }
      }
}