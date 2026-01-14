import React, { useState } from 'react';
import axios from 'axios';

function Login({ setToken, onShowToast }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('=== LOGIN ATTEMPT START ===');
    console.log('Login attempt:', { email, password: '***' });
    console.log('Token in localStorage:', localStorage.getItem('token'));
    
    // Check if user is already logged in
    if (localStorage.getItem('token')) {
      console.log('User already logged in, preventing login attempt');
      return;
    }
    
    try {
      console.log('Making API call to login...');
      const res = await axios.post('http://localhost:5000/auth/login', { email, password });
      console.log('API response:', res);
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      console.log('Toast should show: Login successful');
      onShowToast('Login successful! Welcome back.', 'success');
      // Clear form fields after successful login
      setEmail('');
      setPassword('');
    } catch (err) {
      console.log('=== LOGIN ERROR ===');
      console.log('Full error object:', err);
      console.log('Error response:', err.response);
      console.log('Error status:', err.response?.status);
      console.log('Error data:', err.response?.data);
      console.log('About to show error toast...');
      onShowToast('Login failed. Please check your credentials.', 'error');
      console.log('Error toast called');
    }
    console.log('=== LOGIN ATTEMPT END ===');
  };

  const handleGoogleSignIn = () => {
    window.location.href = 'http://localhost:5000/auth/google';
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="zen-heading text-xl font-light tracking-wide">Sign in</h2>
        <p className="text-zen-charcoal text-xs font-light">Welcome back to your shared space</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-1">
          <input 
            type="email"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Email address" 
            className="zen-input w-full"
            required
          />
        </div>
        
        <div className="space-y-1">
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Password" 
            className="zen-input w-full"
            required
          />
        </div>
        
        <button type="submit" className="zen-button w-full">
          Continue
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

export default Login;
