import React, { useState, useEffect } from 'react';
import axios from 'axios';

function JournalList({ token }) {
  console.log('JournalList received token:', token); // Debug log
  
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    fetchEntries();
  }, [token]);

  const fetchEntries = async () => {
    console.log('Fetching entries with token:', token); // Debug log
    try {
      const res = await axios.get('http://localhost:5000/entries', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEntries(res.data);
    } catch (err) {
      console.error('Failed to fetch entries:', err);
    }
  };

  const deleteEntry = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/entries/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEntries(entries.filter(e => e.id !== id));
    } catch (err) {
      console.error('Failed to delete entry:', err);
      alert('Failed to delete entry');
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="zen-heading text-2xl font-light tracking-wide">Shared memories</h2>
        <p className="text-zen-charcoal text-sm font-light">Your journey together</p>
      </div>
      
      {entries.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-zen-charcoal font-light">No entries yet. Begin your shared story.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {entries.map(entry => (
            <div key={entry.id} className="zen-card p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex-1 space-y-3">
                  <div className="space-y-1">
                    <h3 className="zen-heading text-lg font-light tracking-wide">{entry.title}</h3>
                    <p className="text-zen-charcoal text-xs font-light tracking-wide">
                      {entry.name} • {new Date(entry.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                  
                  {/* Entry Content with Images */}
                  <div className="relative min-h-[100px]">
                    {/* Render Images with Positions */}
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
                      className="relative leading-relaxed font-light whitespace-pre-wrap pr-8"
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
                          className="font-bold mb-2"
                          style={{
                            fontSize: `calc(${entry.fontSize || '16px'} * 1.5)`, // 1.5x bigger
                            fontWeight: 'bold'
                          }}
                        >
                          {entry.title}
                        </div>
                      )}
                      
                      {/* Regular text content */}
                      {entry.text}
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => deleteEntry(entry.id)}
                  className="ml-6 text-zen-charcoal hover:text-red-600 text-xs font-light tracking-wide transition-colors duration-300"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default JournalList;
