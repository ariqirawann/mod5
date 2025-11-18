import { apiClient } from '../config/api';
class FavoriteService {
  /**
   * @param {string} userIdentifier 
   * @returns {Promise}
   */
  async getFavorites(userIdentifier) {
    try {
      const response = await apiClient.get('/api/v1/favorites', {
        params: { user_identifier: userIdentifier }
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @param {Object} data 
   * @param {string} data.recipe_id 
   * @param {string} data.user_identifier 
   * @returns {Promise}
   */
  async toggleFavorite(data) {
    try {
      const response = await apiClient.post('/api/v1/favorites/toggle', data);
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default new FavoriteService();
