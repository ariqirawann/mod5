import { useState, useEffect } from 'react';
import { Share2 } from 'lucide-react';
import ProfileForm from '../components/profile/ProfileForm';
import FavoritesSection from '../components/profile/FavoritesSection';
import userService from '../services/userService';

export default function ProfilePage({ onRecipeClick }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = () => {
    const userProfile = userService.getUserProfile();
    setProfile(userProfile);
    setLoading(false);
  };

  const handleShare = async () => {
    const shareUrl = 'http://mod5-one.vercel.app/';

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Resep Nusantara',
          text: 'Temukan resep masakan Nusantara favorit Anda!',
          url: shareUrl,
        });
      } catch (error) {
        console.log('Error sharing:', error);
        copyToClipboard(shareUrl);
      }
    } else {
      copyToClipboard(shareUrl);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Link aplikasi berhasil disalin ke clipboard!');
    }).catch(() => {
      alert('Gagal menyalin link. URL: ' + text);
    });
  };

  if (loading) {
    return (
      <div className="p-4 md:p-8 pb-20 md:pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Memuat profil...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 pb-20 md:pb-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Profile Pengguna
          </h1>
          <button
            onClick={handleShare}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden md:inline">Bagikan</span>
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Form */}
          <div className="lg:col-span-1">
            <ProfileForm profile={profile} onUpdate={loadProfile} />
          </div>

          {/* Favorites */}
          <div className="lg:col-span-2">
            <FavoritesSection onRecipeClick={onRecipeClick} />
          </div>
        </div>
      </div>
    </div>
  );
}
