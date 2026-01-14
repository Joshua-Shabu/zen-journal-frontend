import React, { useState, useEffect } from 'react';

function WelcomeView({ userEmail, onWriteClick }) {
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase((prev) => (prev + 1) % 4);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getUserName = (email) => {
    if (!email) return 'Friend';
    const name = email.split('@')[0];
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const zenAnimations = [
    {
      text: 'Peace',
      symbol: '🧘',
      color: 'from-zen-green to-zen-blue'
    },
    {
      text: 'Clarity',
      symbol: '💧',
      color: 'from-zen-blue to-zen-purple'
    },
    {
      text: 'Balance',
      symbol: '☯',
      color: 'from-zen-purple to-zen-pink'
    },
    {
      text: 'Harmony',
      symbol: '🌸',
      color: 'from-zen-pink to-zen-green'
    }
  ];

  const currentAnimation = zenAnimations[animationPhase];

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="w-full max-w-4xl space-y-12">
        {/* Zen Animation */}
        <div className="text-center space-y-8">
          <div className="relative inline-block">
            <div className={`w-32 h-32 mx-auto rounded-full bg-gradient-to-br ${currentAnimation.color} flex items-center justify-center text-6xl animate-pulse shadow-lg`}>
              {currentAnimation.symbol}
            </div>
            <div className="mt-4 text-zen-charcoal text-xl font-light tracking-wide animate-fade-in">
              {currentAnimation.text}
            </div>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="text-center space-y-6">
          <h1 className="zen-heading text-5xl font-light tracking-wider">
            Welcome, {getUserName(userEmail)}
          </h1>
          <p className="text-zen-charcoal text-lg font-light leading-relaxed max-w-2xl mx-auto">
            Welcome back to your peaceful space for thoughts and memories. 
            Take a moment to breathe, then share what's on your mind.
          </p>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <button
            onClick={onWriteClick}
            className="zen-button px-12 py-4 text-lg font-light tracking-wide hover:scale-105 transform transition-all duration-300 shadow-lg"
          >
            Write it up
          </button>
        </div>

        {/* Inspirational Quote */}
        <div className="text-center space-y-4">
          <div className="w-24 h-0.5 bg-gradient-to-r from-zen-green to-zen-blue mx-auto"></div>
          <p className="text-zen-charcoal text-sm font-light italic tracking-wide">
            "In the midst of movement and chaos, there is still the beauty of stillness."
          </p>
          <p className="text-zen-charcoal text-xs font-light tracking-wide">
            — Thich Nhat Hanh
          </p>
        </div>
      </div>

      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-2 h-2 bg-zen-green/20 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-zen-blue/20 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-32 left-32 w-2 h-2 bg-zen-purple/20 rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-16 w-4 h-4 bg-zen-pink/20 rounded-full animate-float-delayed"></div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 4s ease-in-out infinite;
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}

export default WelcomeView;
