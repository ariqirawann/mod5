import { apiClient } from '../config/api';

class ReviewService {
  /**
   * @param {string} recipeId 
   * @returns {Promise}
   */
  async getReviews(recipeId) {
    try {
      const response = await apiClient.get(`/api/v1/recipes/${recipeId}/reviews`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @param {string} recipeId 
   * @param {Object} reviewData 
   * @param {string} reviewData.user_identifier 
   * @param {number} reviewData.rating 
   * @param {string} reviewData.comment 
   * @returns {Promise}
   */
  async createReview(recipeId, reviewData) {
    try {
      const response = await apiClient.post(`/api/v1/recipes/${recipeId}/reviews`, reviewData);
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @param {string} reviewId 
   * @param {Object} reviewData 
   * @param {number} reviewData.rating 
   * @param {string} reviewData.comment 
   * @returns {Promise}
   */
  async updateReview(reviewId, reviewData) {
    try {
      const response = await apiClient.put(`/api/v1/reviews/${reviewId}`, reviewData);
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @param {string} reviewId 
   * @returns {Promise}
   */
  async deleteReview(reviewId) {
    try {
      const response = await apiClient.delete(`/api/v1/reviews/${reviewId}`);
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default new ReviewService();