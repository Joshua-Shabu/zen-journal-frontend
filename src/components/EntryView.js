import React from 'react';

function EntryView({ entry }) {
  return (
    <div className="min-h-screen bg-zen-white">
      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-8 py-12">
        <div className="zen-card p-8 space-y-8">
          {/* Entry Metadata */}
          <div className="text-center space-y-4 mb-8">
            <h2 className="zen-heading text-xl font-light tracking-wide">
              {new Date(entry.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </h2>
            <p className="text-zen-charcoal text-sm font-light">
              {entry.name || 'Anonymous'}
            </p>
          </div>

          {/* Entry Content with Images */}
          <div className="relative min-h-[200px] p-8 bg-zen-gray/5 rounded-lg">
            {entry.images && entry.images.map((image, index) => (
              <div
                key={index}
                className="absolute"
                style={{
                  left: `${image.x}px`,
                  top: `${image.y}px`,
                  width: `${image.width}px`,
                  height: `${image.height}px`
                }}
              >
                <img 
                  src={`http://localhost:5000${image.imageUrl}`}
                  alt="Entry image"
                  className="w-full h-full object-cover rounded shadow-md"
                />
              </div>
            ))}

            {/* Text Content */}
            <div 
              className="relative z-10 leading-relaxed font-light whitespace-pre-wrap"
              style={{
                fontFamily: entry.fontFamily || 'sans-serif',
                fontSize: entry.fontSize || '16px',
                fontStyle: entry.fontStyle || 'normal',
                fontWeight: entry.fontWeight || 'normal',
                color: entry.color || '#000000'
              }}
            >
              {/* Display title with larger size */}
              {entry.title && (
                <div 
                  className="font-bold mb-4"
                  style={{
                    fontSize: `calc(${entry.fontSize || '16px'} * 1.5)`
                  }}
                >
                  {entry.title}
                </div>
              )}
              
              {entry.text}
            </div>
          </div>

          {/* Footer */}
          <div className="pt-8 border-t border-zen-gray/10">
            <div className="text-center space-y-2">
              <p className="text-zen-charcoal text-xs font-light">
                This entry is preserved as a memory
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default EntryView;
