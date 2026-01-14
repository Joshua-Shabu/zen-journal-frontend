import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

function AuthTabs({ setToken, onShowToast }) {
  const [activeTab, setActiveTab] = useState('signin');

  return (
    <div className="zen-card overflow-hidden">
      <div className="flex border-b border-zen-stone">
        <button
          onClick={() => setActiveTab('signin')}
          className={`flex-1 px-6 py-4 text-sm font-light tracking-wide transition-all duration-300 ${
            activeTab === 'signin'
              ? 'text-zen-ink border-b-2 border-zen-accent bg-zen-white'
              : 'text-zen-charcoal hover:text-zen-ink bg-zen-gray'
          }`}
        >
          Sign in
        </button>
        <button
          onClick={() => setActiveTab('register')}
          className={`flex-1 px-6 py-4 text-sm font-light tracking-wide transition-all duration-300 ${
            activeTab === 'register'
              ? 'text-zen-ink border-b-2 border-zen-accent bg-zen-white'
              : 'text-zen-charcoal hover:text-zen-ink bg-zen-gray'
          }`}
        >
          Create account
        </button>
      </div>
      
      <div className="p-8">
        {activeTab === 'signin' ? (
          <Login setToken={setToken} onShowToast={onShowToast} />
        ) : (
          <Register setToken={setToken} onShowToast={onShowToast} />
        )}
      </div>
    </div>
  );
}

export default AuthTabs;
