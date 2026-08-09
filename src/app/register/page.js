'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import MainLayout from '../../components/MainLayout';
import toast from 'react-hot-toast';
import { 
  User, 
  Mail, 
  Image as ImageIcon, 
  Lock, 
  UserPlus, 
  ArrowRight, 
  UploadCloud, 
  Link as LinkIcon, 
  X, 
  Camera, 
  RefreshCw, 
  Check 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Register() {
  const { user, register, loginWithGoogle } = useAuth();
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [password, setPassword] = useState('');

  // Photo upload states
  const [photoMode, setPhotoMode] = useState('file'); // 'file' | 'url'
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState('');
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);
  
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      await loginWithGoogle();
    } catch (err) {
      toast.error(err.message || 'Google sign-up failed');
      setLoading(false);
    }
  };

  const [passLength, setPassLength] = useState(false);
  const [passUpper, setPassUpper] = useState(false);
  const [passLower, setPassLower] = useState(false);

  useEffect(() => {
    setPassLength(password.length >= 6);
    setPassUpper(/[A-Z]/.test(password));
    setPassLower(/[a-z]/.test(password));
  }, [password]);

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  // Process selected image file with canvas compression & ImgBB upload fallback
  const processImageFile = async (file) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file (PNG, JPG, WEBP, GIF)');
      return;
    }

    // Max 10MB input check
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size exceeds 10MB limit');
      return;
    }

    setUploadingPhoto(true);
    setFileName(file.name);
    setFileSize((file.size / (1024 * 1024) >= 1) 
      ? `${(file.size / (1024 * 1024)).toFixed(2)} MB` 
      : `${(file.size / 1024).toFixed(1)} KB`);

    try {
      // 1. Try ImgBB upload if environment key exists
      const imgbbKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
      if (imgbbKey) {
        try {
          const formData = new FormData();
          formData.append('image', file);
          const response = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, {
            method: 'POST',
            body: formData,
          });
          const result = await response.json();
          if (result.success && result.data?.url) {
            setPhotoUrl(result.data.url);
            toast.success('Photo uploaded successfully!');
            setUploadingPhoto(false);
            return;
          }
        } catch (imgbbErr) {
          console.warn('ImgBB upload fallback to Data URL:', imgbbErr);
        }
      }

      // 2. Client-side canvas compression to Base64 Data URL
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_SIZE = 400; // Optimal avatar dimension
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_SIZE) {
              height = Math.round((height * MAX_SIZE) / width);
              width = MAX_SIZE;
            }
          } else {
            if (height > MAX_SIZE) {
              width = Math.round((width * MAX_SIZE) / height);
              height = MAX_SIZE;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
          setPhotoUrl(compressedDataUrl);
          toast.success('Photo selected from file manager!');
          setUploadingPhoto(false);
        };
        img.onerror = () => {
          toast.error('Failed to load image file');
          setUploadingPhoto(false);
        };
        img.src = e.target.result;
      };
      reader.onerror = () => {
        toast.error('Error reading image file');
        setUploadingPhoto(false);
      };
      reader.readAsDataURL(file);

    } catch (err) {
      toast.error('Failed to process image');
      setUploadingPhoto(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processImageFile(e.dataTransfer.files[0]);
    }
  };

  const handleRemovePhoto = () => {
    setPhotoUrl('');
    setFileName('');
    setFileSize('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !photoUrl || !password) {
      setErrorMsg('All fields are required. Please upload or provide a photo.');
      return;
    }

    if (!passLength || !passUpper || !passLower) {
      setErrorMsg('Please satisfy all password complexity rules.');
      return;
    }

    setErrorMsg('');
    setLoading(true);
    const res = await register(name, email, photoUrl, password);
    setLoading(false);

    if (res.success) {
      toast.success('Registration successful! Please login.');
      router.push('/login');
    } else {
      setErrorMsg(res.message);
      toast.error(res.message);
    }
  };

  return (
    <MainLayout title="Register">
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="max-w-md w-full space-y-8 bg-slate-900 border border-slate-800/80 p-8 rounded-2xl shadow-xl relative"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 15 }}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />

          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-white">
              Create Account
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Join StudyNook to list and book study rooms
            </p>
          </div>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            {errorMsg && (
              <motion.div 
                className="p-3.5 text-sm bg-rose-950/30 border border-rose-800/30 text-rose-400 rounded-xl"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {errorMsg}
              </motion.div>
            )}

            <div className="space-y-4 rounded-md shadow-sm">
              {/* Full Name */}
              <div>
                <label className="text-sm font-medium text-slate-300 block mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <User className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 block w-full bg-slate-950 border border-slate-800 hover:border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl py-2.5 px-4 text-slate-100 placeholder-slate-500 focus:outline-none text-sm transition-all"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-medium text-slate-300 block mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 block w-full bg-slate-950 border border-slate-800 hover:border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl py-2.5 px-4 text-slate-100 placeholder-slate-500 focus:outline-none text-sm transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              {/* Left-Aligned Profile Photo Picker */}
              <div className="py-1">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <div className="flex items-center gap-4 bg-slate-950/60 border border-slate-800/80 rounded-xl p-3">
                  {/* Avatar Circle */}
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className="relative cursor-pointer group flex-shrink-0"
                  >
                    {photoUrl ? (
                      <div className="relative">
                        <img
                          src={photoUrl}
                          alt="Profile photo"
                          className="w-14 h-14 rounded-full object-cover border-2 border-indigo-500 shadow-md group-hover:opacity-90 transition-opacity"
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150';
                          }}
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemovePhoto();
                          }}
                          className="absolute -top-1 -right-1 bg-slate-900 border border-slate-700 text-slate-400 hover:text-rose-400 p-1 rounded-full shadow transition-colors"
                          title="Remove photo"
                        >
                          <X className="w-3 h-3" />
                        </button>
                        <div className="absolute bottom-0 right-0 bg-indigo-600 text-white p-1 rounded-full shadow-sm group-hover:bg-indigo-500 transition-colors">
                          <Camera className="w-3 h-3" />
                        </div>
                      </div>
                    ) : (
                      <div className={`w-14 h-14 rounded-full border-2 border-dashed flex items-center justify-center transition-all ${
                        dragActive 
                          ? 'border-indigo-500 bg-indigo-950/40 scale-105' 
                          : 'border-slate-700 bg-slate-900 group-hover:border-indigo-500/80 group-hover:bg-slate-800'
                      }`}>
                        {uploadingPhoto ? (
                          <RefreshCw className="w-5 h-5 text-indigo-400 animate-spin" />
                        ) : (
                          <Camera className="w-5 h-5 text-slate-400 group-hover:text-indigo-400 transition-colors" />
                        )}
                      </div>
                    )}
                  </div>

                  {/* Text Label & Action Links */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-200">
                      {photoUrl ? 'Profile Photo Selected' : 'Add Profile Photo'}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                      {photoUrl ? (fileName || 'Image ready to upload') : 'Click circle to pick from file manager'}
                    </p>

                    <button
                      type="button"
                      onClick={() => setPhotoMode(photoMode === 'url' ? 'file' : 'url')}
                      className="text-[11px] text-indigo-400 hover:text-indigo-350 mt-1 transition-colors block font-medium"
                    >
                      {photoMode === 'url' ? '← Choose from file manager' : 'Or paste Photo URL'}
                    </button>
                  </div>
                </div>

                {/* Optional Photo URL Input */}
                {photoMode === 'url' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: 'auto' }}
                    className="w-full mt-2.5"
                  >
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                        <ImageIcon className="w-4 h-4" />
                      </div>
                      <input
                        type="url"
                        value={photoUrl}
                        onChange={(e) => setPhotoUrl(e.target.value)}
                        className="pl-9 block w-full bg-slate-950 border border-slate-800 hover:border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl py-2 px-3 text-slate-100 placeholder-slate-500 focus:outline-none text-xs transition-all"
                        placeholder="https://images.unsplash.com/photo-..."
                      />
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="text-sm font-medium text-slate-300 block mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 block w-full bg-slate-950 border border-slate-800 hover:border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl py-2.5 px-4 text-slate-100 placeholder-slate-500 focus:outline-none text-sm transition-all"
                    placeholder="••••••••"
                  />
                </div>

                {/* Password Checklist */}
                <div className="mt-2.5 grid grid-cols-3 gap-2 text-xs">
                  <span className={`flex items-center gap-1 font-medium transition-colors ${passLength ? 'text-emerald-400' : 'text-slate-500'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${passLength ? 'bg-emerald-500' : 'bg-slate-700'}`} />
                    6+ chars
                  </span>
                  <span className={`flex items-center gap-1 font-medium transition-colors ${passUpper ? 'text-emerald-400' : 'text-slate-500'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${passUpper ? 'bg-emerald-500' : 'bg-slate-700'}`} />
                    1 uppercase
                  </span>
                  <span className={`flex items-center gap-1 font-medium transition-colors ${passLower ? 'text-emerald-400' : 'text-slate-500'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${passLower ? 'bg-emerald-500' : 'bg-slate-700'}`} />
                    1 lowercase
                  </span>
                </div>
              </div>
            </div>

            <div>
              <motion.button
                type="submit"
                disabled={loading || uploadingPhoto}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:opacity-50 cursor-pointer"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <UserPlus className="h-5 w-5 text-indigo-400 group-hover:text-indigo-300" />
                </span>
                {loading ? 'Registering...' : 'Register'}
              </motion.button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-800" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-slate-900 px-2 text-slate-400">Or continue with</span>
              </div>
            </div>

            <motion.button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading || uploadingPhoto}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-xl text-slate-200 font-medium text-sm transition-all duration-200 shadow-sm disabled:opacity-50 cursor-pointer"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              Sign up with Google
            </motion.button>
          </div>

          <div className="text-center pt-4 border-t border-slate-800/40 my-4">
            <p className="text-sm text-slate-400">
              Already have an account?{' '}
              <Link
                href="/login"
                className="font-semibold text-indigo-400 hover:text-indigo-350 transition-colors inline-flex items-center gap-1"
              >
                Login <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
}

