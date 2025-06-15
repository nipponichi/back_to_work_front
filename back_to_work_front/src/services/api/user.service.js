import api from '../http-common'
import toast from '../toast.js'

class UserService {
  get(route) {
    return api.get(route)
  }

  show(route, data) {
    console.log(data)
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
    return api.delete(`${route}/${data}`)
  }

  updateForm(route, data, userId) {
    return api.post(`${route}/${userId}`, data);
  }
}

export default new UserService()