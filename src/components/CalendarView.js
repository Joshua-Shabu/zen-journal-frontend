import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CalendarView({ token, onEntryClick }) {
  const [entries, setEntries] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    fetchEntries();
  }, [token]);

  const fetchEntries = async () => {
    try {
      const res = await axios.get('http://localhost:5000/entries', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEntries(res.data);
    } catch (err) {
      console.error('Failed to fetch entries:', err);
    }
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getEntriesForDate = (day) => {
    const dateStr = new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toLocaleDateString();
    return entries.filter(entry => {
      const entryDate = new Date(entry.date).toLocaleDateString();
      return entryDate === dateStr;
    });
  };

  const navigateMonth = (direction) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1));
  };

  const isToday = (day) => {
    const today = new Date();
    return day === today.getDate() && 
           currentDate.getMonth() === today.getMonth() && 
           currentDate.getFullYear() === today.getFullYear();
  };

  const isCurrentDate = (day) => {
    const today = new Date();
    const currentDateObj = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const todayObj = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return currentDateObj.getTime() === todayObj.getTime();
  };

  const handleDateClick = (day) => {
    const dayEntries = getEntriesForDate(day);
    if (dayEntries.length === 1 && onEntryClick) {
      onEntryClick(dayEntries[0]);
    }
    
    if (isCurrentDate(day)) {
      console.log('Current date clicked - allowing edit mode');
    }
  };

  const handleEntryClick = (entry) => {
    if (onEntryClick) {
      onEntryClick(entry);
    }
  };

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const today = new Date();

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="zen-heading text-3xl font-light tracking-wide">Your Journal Calendar</h2>
        <p className="text-zen-charcoal text-sm font-light">Navigate through your memories</p>
      </div>

      <div className="zen-card p-6">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigateMonth(-1)}
            className="p-3 rounded-lg hover:bg-zen-gray/10 transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            <svg className="w-5 h-5 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          
          <h3 className="zen-heading text-xl font-light tracking-wide transition-all duration-300">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>
          
          <button
            onClick={() => navigateMonth(1)}
            className="p-3 rounded-lg hover:bg-zen-gray/10 transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            <svg className="w-5 h-5 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 01-1.414 0L10 8.586l3.293 3.293a1 1 0 111.414 1.414L11.414 10l3.293 3.293a1 1 0 01-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 01-1.414-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {/* Day Headers */}
          {dayNames.map(day => (
            <div key={day} className="text-center text-xs font-light text-zen-charcoal py-2">
              {day}
            </div>
          ))}
          
          {/* Empty Cells */}
          {Array.from({ length: firstDay }).map((_, index) => (
            <div key={`empty-${index}`} className="aspect-square"></div>
          ))}
          
          {/* Days */}
          {Array.from({ length: daysInMonth }).map((_, index) => {
            const day = index + 1;
            const dayEntries = getEntriesForDate(day);
            const hasEntry = dayEntries.length > 0;
            const isCurrentDay = isToday(day);
            
            return (
              <div
                key={day}
                onClick={() => handleDateClick(day)}
                className="relative"
              >
                {isCurrentDate && (
                  <div 
                    className="absolute inset-0 bg-gradient-to-br from-zen-green/20 via-zen-green/30 to-zen-blue/20 rounded-lg pointer-events-none"
                    style={{ zIndex: 5 }}
                  >
                  </div>
                )}
                
                <div className={`aspect-square border rounded-lg p-1 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                  isCurrentDay 
                    ? 'bg-zen-green/30 border-zen-green shadow-md scale-105' 
                    : 'border-zen-gray/20 hover:bg-zen-gray/10 hover:border-zen-gray/30'
                }`}>
                  <div className={`text-sm font-light text-center transition-colors duration-300 ${
                    isCurrentDay ? 'text-white font-bold' : 'text-zen-charcoal'
                  }`}>
                    {day}
                  </div>
                  {hasEntry && (
                    <div className="mt-1 space-y-1 relative z-10">
                      {dayEntries.slice(0, 2).map((entry, idx) => (
                        <div
                          key={idx}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEntryClick(entry);
                          }}
                          className={`text-xs font-light truncate cursor-pointer transition-all duration-300 hover:scale-105 relative z-20 ${
                            isCurrentDay ? 'text-white/90 hover:text-white' : 'text-zen-charcoal/80 hover:text-zen-green'
                          }`}
                          style={{
                            color: entry.color || '#000000',
                            fontSize: '10px'
                          }}
                        >
                          {entry.title || 'Untitled'}
                        </div>
                      ))}
                      {dayEntries.length > 2 && (
                        <div className={`text-xs font-light transition-colors duration-300 relative z-20 ${
                          isCurrentDay ? 'text-white/80' : 'text-zen-charcoal/60'
                        }`}>
                          +{dayEntries.length - 2} more
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CalendarView;