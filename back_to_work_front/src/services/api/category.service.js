import api from '../http-common'

const CategoryService = {
    get(endpoint = '') {
      return api.get(`/${endpoint}`);
    },
  
    post(endpoint = '', data) {
      return api.post(`/${endpoint}`, data);
    },
  
    put(endpoint = '', data) {
      return api.put(`/${endpoint}`, data);
    },
  
    delete(endpoint = '') {
      return api.delete(`/${endpoint}`);
    }
  };
  
  export default CategoryService;



