import React, { useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config/api';

function GoogleAuthCallback() {
  useEffect(() => {
    const handleGoogleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const error = urlParams.get('error');

      if (error) {
        console.error('Google OAuth error:', error);
        // Redirect back to login with error
        window.location.href = '/?error=google_auth_failed';
        return;
      }

      if (code) {
        try {
          // Exchange authorization code for token
          const response = await axios.post(`${API_BASE_URL}/auth/google-callback`, { code });
          const { token } = response.data;
          
          // Store token and redirect to app
          localStorage.setItem('token', token);
          window.location.href = '/';
        } catch (error) {
          console.error('Error exchanging code for token:', error);
          window.location.href = '/?error=google_token_exchange_failed';
        }
      } else {
        // No code or error, redirect to login
        window.location.href = '/';
      }
    };

    handleGoogleCallback();
  }, []);

  return (
    <div className="min-h-screen bg-zen-white flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-zen-green mx-auto"></div>
        <p className="text-zen-charcoal font-light">Completing Google sign-in...</p>
      </div>
    </div>
  );
}

export default GoogleAuthCallback;
