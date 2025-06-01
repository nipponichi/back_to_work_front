import api from '../http-common'

class AuthService {
  async login(email, password) {
    try {
      const response = await api.post('/login', { email, password });
      
      if (response.status === 403) {
        throw new Error('Your account has been blocked');
      }

      return response; 

    } catch (error) {
      if (error.response && error.response.status === 403) {
        throw new Error('Your account has been blocked. Please contact the administrator.');
      }
      throw error;
    }
  }

  logout(accessToken) {
    return api.post('/logout', {}, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  }

  register(userData) {
    return api.post('/register', userData)
  }
}

export default new AuthService()
