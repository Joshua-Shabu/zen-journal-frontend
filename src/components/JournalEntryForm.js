import React, { useState, useRef } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config/api';

function JournalEntryForm({ token, onEntryAdded, onShowToast }) {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [images, setImages] = useState([]);
  const [fontFamily, setFontFamily] = useState('sans-serif');
  const [fontSize, setFontSize] = useState('16px');
  const [fontStyle, setFontStyle] = useState('normal');
  const [fontWeight, setFontWeight] = useState('normal');
  const [color, setColor] = useState('#000000');
  const [showToolbar, setShowToolbar] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [draggedImage, setDraggedImage] = useState(null);
  const [resizingImage, setResizingImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !text) return;
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('name', 'User'); // Add name field as expected by backend
    formData.append('text', text);
    formData.append('fontFamily', fontFamily);
    formData.append('fontSize', fontSize);
    formData.append('fontStyle', fontStyle);
    formData.append('fontWeight', fontWeight);
    formData.append('color', color);
    
    // Add all images
    images.forEach((image, index) => {
      if (image.file) {
        formData.append('images', image.file); // Use 'images' instead of 'image${index}'
      }
      formData.append(`imageData${index}`, JSON.stringify({
        id: image.id,
        x: image.x,
        y: image.y,
        width: image.width,
        height: image.height
      }));
    });
    
    try {
      await axios.post(`${API_BASE_URL}/entries`, formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // Reset form
      setTitle('');
      setText('');
      setImages([]);
      setFontFamily('sans-serif');
      setFontSize('16px');
      setFontStyle('normal');
      setFontWeight('normal');
      setColor('#000000');
      
      if (onEntryAdded) {
        onEntryAdded();
      }
      onShowToast('Your thought has been shared successfully!', 'success');
    } catch (err) {
      console.error('Failed to add entry:', err);
      onShowToast('Failed to add entry. Please try again.', 'error');
    }
  };

  const fonts = [
    'sans-serif', 'serif', 'monospace', 'cursive', 'fantasy',
    'Arial', 'Times New Roman', 'Courier New', 'Georgia', 'Verdana'
  ];

  const fontSizes = ['12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px'];

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      id: Date.now() + Math.random(),
      file,
      x: 50,
      y: 50,
      width: 150,
      height: 150
    }));
    setImages([...images, ...newImages]);
  };

  const handleImageDrag = (e) => {
    if (draggedImage === null) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setImages(images.map(img => 
      img.id === draggedImage 
        ? { ...img, x: Math.max(0, x - 50), y: Math.max(0, y - 50) }
        : img
    ));
  };

  const handleImageDrop = (e) => {
    setDraggedImage(null);
  };

  const handleMouseMove = (e) => {
    if (resizingImage === null) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const image = images.find(img => img.id === resizingImage);
    if (!image) return;
    
    const newWidth = Math.max(50, e.clientX - rect.left - image.x);
    const newHeight = Math.max(50, e.clientY - rect.top - image.y);
    
    setImages(images.map(img => 
      img.id === resizingImage 
        ? { ...img, width: newWidth, height: newHeight }
        : img
    ));
  };

  const handleMouseUp = () => {
    setResizingImage(null);
    setDraggedImage(null);
  };

  const removeImage = (imageId) => {
    setImages(images.filter(img => img.id !== imageId));
  };

  return (
    <div className="zen-card p-8 space-y-8">
      <div className="text-center space-y-2">
        <h2 className="zen-heading text-2xl font-light tracking-wide">Share your thoughts</h2>
        <p className="text-zen-charcoal text-sm font-light tracking-wide">
          Express yourself freely
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Title Input - Now Required */}
        <div className="space-y-2">
          <label className="text-zen-charcoal text-sm font-light tracking-wide">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give your thought a title..."
            className="zen-input w-full"
            required
          />
        </div>
        
        <div 
          className="relative"
          onMouseEnter={() => setShowToolbar(true)}
          onMouseLeave={() => setShowToolbar(false)}
        >
          {/* Text Area with Images */}
          <div 
            className="relative min-h-[200px] zen-input p-4 resize-none leading-relaxed"
            style={{
              fontFamily,
              fontSize,
              fontStyle,
              fontWeight,
              color
            }}
            onMouseMove={(e) => {
              if (draggedImage !== null || resizingImage !== null) {
                handleImageDrag(e);
                handleMouseMove(e);
              }
            }}
            onMouseUp={() => {
              handleImageDrop();
              handleMouseUp();
            }}
            onMouseLeave={() => {
              handleImageDrop();
              handleMouseUp();
            }}
          >
            {/* Render Images */}
            {images.map(image => (
              <div
                key={image.id}
                className={`absolute group ${draggedImage === image.id ? 'cursor-grabbing' : 'cursor-grab'}`}
                style={{
                  left: `${image.x}px`,
                  top: `${image.y}px`,
                  width: `${image.width}px`,
                  height: `${image.height}px`,
                  zIndex: draggedImage === image.id ? 1000 : 10
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setDraggedImage(image.id);
                }}
              >
                <img 
                  src={image.url}
                  alt="Uploaded"
                  className="w-full h-full object-cover rounded shadow-md pointer-events-none"
                  draggable={false}
                />
                
                {/* Resize Handle */}
                <div 
                  className="absolute bottom-0 right-0 w-4 h-4 bg-blue-500 rounded-full cursor-se-resize opacity-0 group-hover:opacity-100 transition-opacity pointer-events-auto"
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setResizingImage(image.id);
                  }}
                />
                
                {/* Delete Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(image.id);
                  }}
                  className="absolute top-0 right-0 w-6 h-6 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 pointer-events-auto"
                >
                  ×
                </button>
              </div>
            ))}
            
            {/* Text Overlay */}
            <textarea
              placeholder="Write your thought..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="absolute inset-0 w-full h-full bg-transparent resize-none leading-relaxed p-4 border-0 outline-none"
              style={{
                fontFamily,
                fontSize,
                fontStyle,
                fontWeight,
                color,
                pointerEvents: draggedImage !== null ? 'none' : 'auto',
                zIndex: 1
              }}
              required
            />
          </div>

          {/* Bottom-Left Toolbar */}
          <div className={`absolute bottom-2 left-2 z-10 flex items-center space-x-1 bg-white rounded-lg shadow-lg p-1 transition-all duration-300 ${showToolbar ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
            {/* Image Upload Icon */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2 hover:bg-gray-100 rounded transition-colors"
              title="Upload Image"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"/>
              </svg>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />

            {/* Font Family Icon */}
            <div className="relative group">
              <button
                type="button"
                className="p-2 hover:bg-gray-100 rounded transition-colors"
                title="Font Family"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 5h14v2H3V5zm0 4h10v2H3V9zm0 4h14v2H3v-2z"/>
                </svg>
              </button>
              <div className="absolute bottom-full mb-1 left-0 bg-white border border-gray-200 rounded-lg shadow-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto">
                <div className="max-h-40 overflow-y-auto">
                  {fonts.map(font => (
                    <button
                      key={font}
                      type="button"
                      onClick={() => setFontFamily(font)}
                      className="block w-full text-left px-2 py-1 text-xs hover:bg-gray-100 rounded"
                      style={{ fontFamily: font }}
                    >
                      {font}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Font Size Icon */}
            <div className="relative group">
              <button
                type="button"
                className="p-2 hover:bg-gray-100 rounded transition-colors"
                title="Font Size"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4h12v2H4V4zm0 4h8v2H4V8zm0 4h12v2H4v-2z"/>
                </svg>
              </button>
              <div className="absolute bottom-full mb-1 left-0 bg-white border border-gray-200 rounded-lg shadow-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto">
                {fontSizes.map(size => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setFontSize(size)}
                    className="block w-full text-left px-2 py-1 text-xs hover:bg-gray-100 rounded"
                  >
                    {size}
                  </button>
                ))}
                </div>
            </div>

            {/* Font Style Icon */}
            <div className="relative group">
              <button
                type="button"
                className="p-2 hover:bg-gray-100 rounded transition-colors"
                title="Font Style"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6 4h8v2H6V4zm0 4h8v2H6V8zm0 4h8v2H6v-2z"/>
                </svg>
              </button>
              <div className="absolute bottom-full mb-1 left-0 bg-white border border-gray-200 rounded-lg shadow-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto">
                <button
                  type="button"
                  onClick={() => setFontStyle('normal')}
                  className="block w-full text-left px-2 py-1 text-xs hover:bg-gray-100 rounded"
                >
                  Normal
                </button>
                <button
                  type="button"
                  onClick={() => setFontStyle('italic')}
                  className="block w-full text-left px-2 py-1 text-xs hover:bg-gray-100 rounded italic"
                >
                  Italic
                </button>
              </div>
            </div>

            {/* Font Weight Icon */}
            <div className="relative group">
              <button
                type="button"
                className="p-2 hover:bg-gray-100 rounded transition-colors"
                title="Font Weight"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4h14v2H3V5zm0 4h14v2H3V9zm0 4h14v2H3v-2z"/>
                </svg>
              </button>
              <div className="absolute bottom-full mb-1 left-0 bg-white border border-gray-200 rounded-lg shadow-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto">
                <button
                  type="button"
                  onClick={() => setFontWeight('normal')}
                  className="block w-full text-left px-2 py-1 text-xs hover:bg-gray-100 rounded"
                >
                  Normal
                </button>
                <button
                  type="button"
                  onClick={() => setFontWeight('bold')}
                  className="block w-full text-left px-2 py-1 text-xs hover:bg-gray-100 rounded font-bold"
                >
                  Bold
                </button>
              </div>
            </div>

            {/* Color Picker Icon */}
            <div className="relative group">
              <button
                type="button"
                className="p-2 hover:bg-gray-100 rounded transition-colors"
                title="Text Color"
                onClick={() => setShowColorPicker(!showColorPicker)}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"/>
                </svg>
              </button>
              {showColorPicker && (
                <div className="absolute bottom-full mb-1 left-0 bg-white border border-gray-200 rounded-lg shadow-lg p-2 opacity-100 transition-opacity pointer-events-auto">
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-full h-8 cursor-pointer"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="zen-button px-8 py-3 font-light tracking-wide hover:scale-105 transform transition-all duration-300"
          >
            Share Thought
          </button>
        </div>
      </form>
    </div>
  );
}

export default JournalEntryForm;
