import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

export default {
  async getUserRatingsCount(userId) {
    const token = localStorage.getItem('token');
    return await axios.get(`${API_URL}/userstats/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  },

  async getRatingsByUser(userId) {
    const token = localStorage.getItem('token');
    return await axios.get(`${API_URL}/userstats/list/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
