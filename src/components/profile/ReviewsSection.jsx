import { useState, useEffect } from 'react';
import { Star, MessageSquare } from 'lucide-react';
import { formatDate } from '../../utils/helpers';
import reviewService from '../../services/reviewService';
import userService from '../../services/userService';

export default function ReviewsSection() {
  const [userReviews, setUserReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadUserReviews();
  }, []);

  const loadUserReviews = async () => {
    try {
      setLoading(true);
      setError(null);

      const userIdentifier = userService.getUserIdentifier();

      setUserReviews([]);

    } catch (err) {
      setError('Gagal memuat ulasan');
      setUserReviews([]);
    } finally {
      setLoading(false);
    }
  };

  const mockReviews = [
    {
      id: 1,
      recipe_name: 'Nasi Goreng Spesial',
      rating: 5,
      comment: 'Resepnya sangat mudah diikuti dan hasilnya enak banget!',
      created_at: '2024-01-15T10:30:00Z'
    },
    {
      id: 2,
      recipe_name: 'Rendang Daging',
      rating: 4,
      comment: 'Proses memasaknya cukup lama tapi worth it dengan rasanya.',
      created_at: '2024-01-10T14:20:00Z'
    }
  ];

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-blue-500" />
          Ulasan Saya
        </h2>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat ulasan...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-blue-500" />
          Ulasan Saya
        </h2>
        <div className="text-center py-8">
          <p className="text-red-600">Gagal memuat ulasan</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <MessageSquare className="w-5 h-5 text-blue-500" />
        Ulasan Saya ({mockReviews.length})
      </h2>

      {mockReviews.length === 0 ? (
        <div className="text-center py-8">
          <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Belum ada ulasan</p>
          <p className="text-sm text-gray-400 mt-2">
            Berikan ulasan pada resep yang telah Anda coba
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {mockReviews.map((review) => (
            <div
              key={review.id}
              className="bg-gray-50 rounded-lg p-4"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    {review.recipe_name}
                  </h3>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= review.rating
                            ? 'text-yellow-500 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  {formatDate(review.created_at)}
                </p>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
