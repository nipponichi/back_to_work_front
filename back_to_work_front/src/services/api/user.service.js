import api from '../http-common'

class UserService {
  get(route) {
    return api.get(route)
  }

  show(route, data) {
    return api.get(`${route}/${data}`)
  }

  set(route, data) {
    const config = {}
    
    if (data instanceof FormData) {
      config.headers = {
        'Content-Type': 'multipart/form-data'
      }
    }
    
    return api.post(route, data, config)
  }

  update(route, data, id) {
    const config = {}
    
    if (data instanceof FormData) {
      config.headers = {
        'Content-Type': 'multipart/form-data'
      }
    }

    return api.put(`${route}/${id}`, data, config)

  }
  delete(route, data) {
    return api.delete(route, data, config)
  }

  updateForm(route, data, userId) {
    return api.post(`${route}/${userId}`, data);
  }
}

export default new UserService()