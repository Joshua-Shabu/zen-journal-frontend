import React, { useState } from 'react';
import AuthTabs from './components/AuthTabs';
import WelcomeView from './components/WelcomeView';
import JournalEntryForm from './components/JournalEntryForm';
import CalendarView from './components/CalendarView';
import EntryView from './components/EntryView';
import ToastContainer from './components/ToastContainer';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [currentView, setCurrentView] = useState('welcome'); // 'welcome', 'write', 'calendar', 'entry', or 'auth'
  const [showMenu, setShowMenu] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    console.log('Adding toast:', { id, message, type });
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    console.log('Removing toast:', id);
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const handleEntryAdded = () => {
    // Refresh functionality can be added later if needed
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
    setUserEmail('');
    setCurrentView('auth');
    setShowMenu(false);
    addToast('You have been logged out successfully.', 'info');
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-zen-white flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-12">
          <div className="text-center space-y-4">
            <h1 className="zen-heading text-4xl font-light tracking-wider">
              あの日記
            </h1>
            <p className="text-zen-charcoal text-sm font-light tracking-wide">
              A shared space for your thoughts
            </p>
          </div>
          <AuthTabs setToken={(token) => {
            setToken(token);
            localStorage.setItem('token', token);
            setCurrentView('welcome');
            // Extract email from token
            try {
              const payload = JSON.parse(atob(token.split('.')[1]));
              setUserEmail(payload.email);
            } catch (error) {
              // Login success will be shown by Login component
            }
          }} onShowToast={addToast} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zen-white">
      {/* Header with Hamburger Menu */}
      <header className="bg-white border-b border-zen-gray/10 px-8 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          {/* App Title/Logo */}
          <button
            onClick={() => setCurrentView('welcome')}
            className="text-zen-ink hover:text-zen-green transition-colors duration-300"
          >
            <h1 className="zen-heading text-2xl font-light tracking-wide">
              あの日記
            </h1>
          </button>
          
          {/* Hamburger Menu */}
          <div className="relative">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg hover:bg-zen-gray/10 transition-colors duration-300"
            >
              <div className="w-6 h-0.5 bg-zen-charcoal mb-1.5"></div>
              <div className="w-6 h-0.5 bg-zen-charcoal mb-1.5"></div>
              <div className="w-6 h-0.5 bg-zen-charcoal"></div>
            </button>
            
            {/* Dropdown Menu */}
            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-zen-gray/20 py-2 z-50">
                <button
                  onClick={() => {
                    setCurrentView('write');
                    setShowMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm font-light hover:bg-zen-gray/10 transition-colors duration-300"
                >
                  Write it up
                </button>
                <button
                  onClick={() => {
                    setCurrentView('calendar');
                    setShowMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm font-light hover:bg-zen-gray/10 transition-colors duration-300"
                >
                  View all notes
                </button>
                <hr className="my-2 border-zen-gray/20" />
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm font-light hover:bg-zen-gray/10 transition-colors duration-300 text-zen-red"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-8 py-12">
        {currentView === 'welcome' && (
          <WelcomeView userEmail={userEmail} onWriteClick={() => setCurrentView('write')} />
        )}
        
        {currentView === 'write' && (
          <div className="max-w-4xl mx-auto">
            <JournalEntryForm 
              token={token} 
              onEntryAdded={handleEntryAdded}
              onShowToast={addToast}
            />
          </div>
        )}
        
        {currentView === 'calendar' && (
          <CalendarView 
            token={token} 
            onEntryClick={(entry) => {
              setSelectedEntry(entry);
              setCurrentView('entry');
            }} 
          />
        )}
        
        {currentView === 'entry' && selectedEntry && (
          <EntryView 
            entry={selectedEntry} 
            onBack={() => {
              setSelectedEntry(null);
              setCurrentView('calendar');
            }} 
          />
        )}
      </main>
      
      {/* Toast Container */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}

export default App;
