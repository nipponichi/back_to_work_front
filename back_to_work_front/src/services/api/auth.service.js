import api from '../http-common'

class AuthService {
  async login(email, password) {
    try {
      const response = await api.post('/login', { email, password });
      
      // Si la respuesta tiene un código 403 (usuario bloqueado)
      if (response.status === 403) {
        throw new Error('Your account has been blocked');
      }

      return response;  // Si es exitoso, devolvemos la respuesta normal

    } catch (error) {
      // Aquí manejamos el error, ya sea por usuario bloqueado o por otros problemas
      if (error.response && error.response.status === 403) {
        throw new Error('Your account has been blocked. Please contact the administrator.');
      }
      throw error; // Si el error no es un bloqueo, lo lanzamos tal cual
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
