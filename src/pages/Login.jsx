import React, { useState } from 'react';
import { Lock, User, Eye, EyeOff, Layers, AlertCircle, RefreshCw } from 'lucide-react';
import apiClient from '../api/client';

export default function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await apiClient.post('/auth/login', { username, password });
      const data = res.data;
      const token = data?.data?.token || '';
      if (token) {
        onLoginSuccess(token, { username, name: username, role: 'admin' });
      } else {
        setError('Login failed. Invalid response from server.');
      }
    } catch (err) {
      setError(err.response?.data?.status?.message || err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-monday-background px-4">
      <div className="w-full max-w-[480px] bg-white border border-monday-border rounded-3xl p-8 shadow-sm flex flex-col gap-6 transition-300 hover:shadow-md">
        
        {/* Brand Logo */}
        <div className="flex items-center justify-center gap-3">
          <div className="bg-monday-blue p-3 rounded-2xl text-white">
            <Layers size={26} />
          </div>
          <div>
            <h1 className="font-extrabold text-2xl text-monday-black uppercase tracking-tight leading-none">RESERVIFY</h1>
            <p className="text-[10px] text-monday-gray font-extrabold tracking-widest uppercase mt-1">BOOKING SYSTEM</p>
          </div>
        </div>

        <div className="text-center space-y-1">
          <h2 className="font-extrabold text-xl text-monday-black">Welcome Back</h2>
          <p className="text-sm text-monday-gray font-medium">Sign in to access the booking dashboard</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="flex items-center gap-3 bg-monday-red/10 border border-monday-red/20 text-monday-red p-4 rounded-2xl text-sm font-semibold">
            <AlertCircle size={20} className="shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Username input */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-monday-black uppercase tracking-wider pl-1" htmlFor="username">
              Username
            </label>
            <div className="relative flex items-center">
              <User className="absolute left-4 text-monday-gray" size={18} />
              <input
                id="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full pl-12 pr-4 py-3.5 bg-monday-background border border-transparent rounded-2xl text-sm font-semibold text-monday-black placeholder-monday-gray/50 focus:border-monday-blue focus:bg-[var(--monday-card)] focus:outline-none transition-300"
              />
            </div>
          </div>

          {/* Password input */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-monday-black uppercase tracking-wider pl-1" htmlFor="password">
              Password
            </label>
            <div className="relative flex items-center">
              <Lock className="absolute left-4 text-monday-gray" size={18} />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-12 py-3.5 bg-monday-background border border-transparent rounded-2xl text-sm font-semibold text-monday-black placeholder-monday-gray/50 focus:border-monday-blue focus:bg-[var(--monday-card)] focus:outline-none transition-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-monday-gray hover:text-monday-black transition-300 cursor-pointer"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center py-4 rounded-2xl text-sm font-bold text-white blue-gradient hover:bg-opacity-90 shadow-md hover:shadow-lg disabled:opacity-50 transition-300 mt-2 gap-2 cursor-pointer"
          >
            {loading ? (
              <>
                <RefreshCw size={18} className="animate-spin" />
                <span>Signing in...</span>
              </>
            ) : (
              <span>Sign In</span>
            )}
          </button>
        </form>

        {/* Footer Info */}
        <div className="text-center text-xs text-monday-gray font-bold border-t border-monday-border pt-4 mt-2">
          <p>Reservify v1.0.0 &copy; 2026</p>
          <p className="text-[10px] text-monday-blue mt-0.5 uppercase tracking-wide">Room Booking System</p>
        </div>
      </div>
    </div>
  );
}
