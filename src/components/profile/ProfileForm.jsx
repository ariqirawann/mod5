import { useState, useRef } from 'react';
import { Camera, User, Mail, Edit3 } from 'lucide-react';
import userService from '../../services/userService';
import uploadService from '../../services/uploadService';

export default function ProfileForm({ profile, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: profile.username || '',
    bio: profile.bio || ''
  });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  const fileInputRef = useRef(null);

  const handleAvatarUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      setAvatarError(false);

      const localUrl = URL.createObjectURL(file);

      const updateResult = userService.updateAvatar(localUrl);
      if (updateResult.success) {
        onUpdate();
        alert('Avatar berhasil diupdate!');
      } else {
        alert('Gagal menyimpan avatar');
      }

    } catch (error) {
      alert('Terjadi kesalahan saat upload gambar');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const updateResult = userService.saveUserProfile({
        username: formData.username,
        bio: formData.bio
      });

      if (updateResult.success) {
        setIsEditing(false);
        onUpdate();
      } else {
        alert('Gagal menyimpan profil');
      }
    } catch (error) {
      alert('Terjadi kesalahan saat menyimpan profil');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex flex-col items-center mb-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold overflow-hidden">
            {profile.avatar && !avatarError ? (
              <img
                src={profile.avatar}
                alt="Avatar"
                className="w-full h-full object-cover rounded-full"
                onError={() => setAvatarError(true)}
              />
            ) : (
              profile.username.charAt(0).toUpperCase()
            )}
          </div>
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <Camera className="w-4 h-4" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleAvatarUpload}
            className="hidden"
          />
        </div>
        {uploading && (
          <p className="text-sm text-blue-600 mt-2">Mengupload gambar...</p>
        )}
      </div>

      <div className="space-y-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <User className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-600">Nama Lengkap</span>
          </div>
          <p className="text-lg font-semibold text-gray-800">Ariq Fariz Fakhri Irawan</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Mail className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-600">NIM</span>
          </div>
          <p className="text-lg font-semibold text-gray-800">21120123130095</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-600">Username</span>
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="text-blue-600 hover:text-blue-700"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            )}
          </div>
          {isEditing ? (
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Masukkan username"
            />
          ) : (
            <p className="text-lg text-gray-800">{profile.username || 'Belum diatur'}</p>
          )}
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Bio</span>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="text-blue-600 hover:text-blue-700"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            )}
          </div>
          {isEditing ? (
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              placeholder="Ceritakan tentang diri Anda..."
            />
          ) : (
            <p className="text-gray-700">{profile.bio || 'Belum ada bio'}</p>
          )}
        </div>

        {isEditing && (
          <div className="flex gap-3 pt-4">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Menyimpan...' : 'Simpan'}
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setFormData({
                  username: profile.username || '',
                  bio: profile.bio || ''
                });
              }}
              className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Batal
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
