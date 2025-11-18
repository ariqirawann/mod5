import { useState } from 'react';
import { Heart, Clock, ChefHat, Star } from 'lucide-react';
import { useFavorites } from '../../hooks/useFavorites';
import { getDifficultyColor } from '../../utils/helpers';

export default function FavoritesSection({ onRecipeClick }) {
  const { favorites, loading, error } = useFavorites();

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Heart className="w-5 h-5 text-red-500" />
          Resep Favorit
        </h2>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat resep favorit...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Heart className="w-5 h-5 text-red-500" />
          Resep Favorit
        </h2>
        <div className="text-center py-8">
          <p className="text-red-600">Gagal memuat resep favorit</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Heart className="w-5 h-5 text-red-500" />
        Resep Favorit ({favorites.length})
      </h2>

      {favorites.length === 0 ? (
        <div className="text-center py-8">
          <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Belum ada resep favorit</p>
          <p className="text-sm text-gray-400 mt-2">
            Klik ikon hati pada resep yang Anda suka
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {favorites.map((recipe) => (
            <div
              key={recipe.id}
              onClick={() => onRecipeClick && onRecipeClick(recipe.id)}
              className="bg-gray-50 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors"
            >
              <div className="flex gap-4">
                <img
                  src={recipe.image_url}
                  alt={recipe.name}
                  className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                    {recipe.name}
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{recipe.prep_time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ChefHat className="w-3 h-3" />
                      <span className={`capitalize ${getDifficultyColor(recipe.difficulty)}`}>
                        {recipe.difficulty}
                      </span>
                    </div>
                  </div>
                  {recipe.average_rating > 0 && (
                    <div className="flex items-center gap-1 mt-2">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <span className="text-sm text-gray-600">
                        {recipe.average_rating.toFixed(1)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
