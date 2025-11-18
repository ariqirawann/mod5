import { useState, useEffect, useCallback, useRef } from 'react';
import recipeService from '../services/recipeService';

const cache = new Map();
const CACHE_TTL = 10 * 60 * 1000;

/**
 * @param {Object} params 
 * @returns {Object} 
 */
export function useRecipes(params = {}) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);

  const currentParamsRef = useRef();

  const fetchRecipes = useCallback(async (forceRefresh = false) => {
    const cacheKey = JSON.stringify(params);

    if (!forceRefresh && cache.has(cacheKey)) {
      const cached = cache.get(cacheKey);
      const now = Date.now();

      if (now - cached.timestamp < CACHE_TTL) {
        setRecipes(cached.data || []);
        setPagination(cached.pagination || null);
        setLoading(false);
        setError(null);
        return;
      } else {
        cache.delete(cacheKey);
      }
    }

    try {
      setLoading(true);
      setError(null);
      const response = await recipeService.getRecipes(params);

      if (response.success) {
        const data = response.data || [];
        const paginationData = response.pagination || null;

        cache.set(cacheKey, {
          data,
          pagination: paginationData,
          timestamp: Date.now()
        });

        setRecipes(data);
        setPagination(paginationData);
      } else {
        setError(response.message || 'Failed to fetch recipes');
        setRecipes([]);
        setPagination(null);
      }
    } catch (err) {
      setError(err.message || 'An error occurred while fetching recipes');
      setRecipes([]);
      setPagination(null);
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(params)]);

  useEffect(() => {
    const newParams = JSON.stringify(params);
    if (currentParamsRef.current !== newParams) {
      currentParamsRef.current = newParams;
      fetchRecipes();
    }
  }, [fetchRecipes]);

  const refetch = useCallback(() => {
    fetchRecipes(true);
  }, [fetchRecipes]);

  return {
    recipes,
    loading,
    error,
    pagination,
    refetch,
  };
}

/**
 * @param {string} id 
 * @returns {Object} 
 */
export function useRecipe(id) {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRecipe = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await recipeService.getRecipeById(id);

      if (response.success) {
        setRecipe(response.data);
      } else {
        setError(response.message || 'Failed to fetch recipe');
      }
    } catch (err) {
      setError(err.message || 'An error occurred while fetching recipe');
      setRecipe(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchRecipe();
  }, [fetchRecipe]);

  return {
    recipe,
    loading,
    error,
    refetch: fetchRecipe,
  };
}
