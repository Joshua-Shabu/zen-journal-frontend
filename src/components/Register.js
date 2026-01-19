import React, { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config/api';

function Register({ setToken, onShowToast }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showPasswordSetup, setShowPasswordSetup] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      onShowToast('Please enter your email address.', 'error');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      onShowToast('Please enter a valid email address.', 'error');
      return;
    }
    setShowPasswordSetup(true);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      onShowToast('Please enter both password fields.', 'error');
      return;
    }
    if (password !== confirmPassword) {
      onShowToast('Passwords do not match.', 'error');
      return;
    }
    try {
      await axios.post(`${API_BASE_URL}/auth/request-otp`, { email });
      setShowOtpInput(true);
      onShowToast('Registration email sent! Please check your inbox.', 'info');
    } catch (err) {
      onShowToast('Registration failed: ' + (err.response?.data?.error || 'Please try again.'), 'error');
    }
  };

  const handleCompleteRegistration = async (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      onShowToast('Please enter a valid 6-digit OTP.', 'error');
      return;
    }
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/verify-register`, { email, otp, password });
      const token = res.data.token;
      localStorage.setItem('token', token);
      setToken(token);
      onShowToast('Registration successful! Welcome to your journal.', 'success');
    } catch (err) {
      onShowToast('Registration failed: ' + (err.response?.data?.error || 'Unknown error'), 'error');
    }
  };

  const handleGoogleSignIn = () => {
    window.location.href = `${API_BASE_URL}/auth/google`;
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="zen-heading text-xl font-light tracking-wide">Create account</h2>
        <p className="text-zen-charcoal text-xs font-light">Begin your shared journey</p>
      </div>
      
      <form onSubmit={showOtpInput ? handleCompleteRegistration : showPasswordSetup ? handlePasswordSubmit : handleEmailSubmit} className="space-y-6">
        <div className="space-y-1">
          <input 
            type="email"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Email address" 
            className="zen-input w-full"
            required
            disabled={showPasswordSetup || showOtpInput}
          />
        </div>
        
        {showPasswordSetup && (
          <>
            <div className="space-y-1">
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Create password" 
                className="zen-input w-full"
                required
              />
            </div>
            <div className="space-y-1">
              <input 
                type="password" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                placeholder="Confirm password" 
                className="zen-input w-full"
                required
              />
            </div>
          </>
        )}
        
        {showOtpInput && (
          <div className="space-y-1">
            <input 
              type="text"
              value={otp} 
              onChange={(e) => setOtp(e.target.value)} 
              placeholder="Enter 6-digit code" 
              className="zen-input w-full text-center tracking-widest"
              maxLength={6}
              required
            />
          </div>
        )}
        
        <button type="submit" className="zen-button w-full">
          {showOtpInput ? 'Complete' : showPasswordSetup ? 'Send code' : 'Continue'}
        </button>
      </form>
      
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-zen-stone"></div>
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="px-3 bg-zen-white text-zen-charcoal font-light">or</span>
        </div>
      </div>
      
      <button 
        type="button"
        onClick={handleGoogleSignIn}
        className="w-full bg-zen-white border border-zen-stone text-zen-charcoal py-3 px-6 rounded-xl font-light tracking-wide hover:bg-zen-gray transition-all duration-300 flex items-center justify-center gap-3"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        Continue with Google
      </button>
    </div>
  );
}

export default Register;
