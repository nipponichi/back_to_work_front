import api from '../http-common';

const AdService = {
  getAds() {
    return api.get('/ads');  // Asume que el endpoint de anuncios es "/ads"
  },

  getAdById(id) {
    return api.get(`/ads/${id}`);  // Obtener un anuncio por su ID
  },

  createAd(data) {
    return api.post('/ads', data);  // Crear un nuevo anuncio
  },

  updateAd(id, data) {
    return api.put(`/ads/${id}`, data);  // Actualizar un anuncio existente
  },

  deleteAd(id) {
    return api.delete(`/ads/${id}`);  // Eliminar un anuncio
  }
};

export default AdService;
