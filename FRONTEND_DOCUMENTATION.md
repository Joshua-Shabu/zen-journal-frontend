# Mini Couple Journal - Frontend Documentation

## 📋 Overview

The frontend is a React application built with Create React App that provides a beautiful, zen-themed interface for couples to share their thoughts, memories, and daily experiences through journal entries with images.

## 🏗️ Technical Architecture

### **Technology Stack**
- **React 19.2.3** - Modern React with hooks
- **React Scripts 5.0.1** - Build tooling
- **Axios 1.13.2** - HTTP client for API calls
- **TailwindCSS 3.4.19** - Utility-first CSS framework
- **Vercel** - Deployment platform

### **Project Structure**
```
src/
├── components/          # React components
│   ├── AuthTabs.js      # Login/Register tabs
│   ├── CalendarView.js  # Calendar view of entries
│   ├── EntryView.js     # Individual entry display
│   ├── JournalEntryForm.js # Create/edit entries
│   ├── JournalList.js   # List all entries
│   ├── Login.js         # Login component
│   ├── Register.js      # Registration component
│   ├── ToastContainer.js # Notification system
│   └── WelcomeView.js   # Welcome screen
├── config/
│   └── api.js          # API base URL configuration
├── App.js              # Main application component
└── index.js            # Application entry point
```

## 🔧 How the App Works

### **Authentication Flow**
1. **Registration**: Users register via email with OTP verification
2. **Login**: Email/password authentication with JWT tokens
3. **Google Sign-In**: OAuth integration for quick access
4. **Token Management**: JWT stored in localStorage for session persistence

### **Core Features**

#### **Journal Entry Creation**
- **Rich Text Editor**: Custom styled text area with formatting options
- **Image Upload**: Multiple image support with drag-and-drop positioning
- **Font Customization**: Font family, size, style, weight, and color options
- **Real-time Preview**: Live preview of text formatting

#### **Calendar View**
- **Monthly Calendar**: Visual representation of all entries
- **Entry Indicators**: Visual cues for entries on specific dates
- **Navigation**: Month-by-month browsing
- **Click Actions**: Direct access to entries from calendar

#### **Entry Management**
- **Create**: New journal entries with images and formatting
- **View**: Detailed view of individual entries
- **Delete**: Remove unwanted entries
- **Edit**: Modify existing entries (future enhancement)

### **API Integration**
- **Base URL**: Configurable via `REACT_APP_API_URL` environment variable
- **Authentication**: Bearer token authentication for all API calls
- **Error Handling**: Comprehensive error handling with user-friendly notifications
- **Loading States**: Visual feedback during API operations

## 🎨 UI/UX Design

### **Design Philosophy**
- **Zen Theme**: Minimalist, calming aesthetic
- **Responsive Design**: Works on all device sizes
- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation
- **Micro-interactions**: Smooth transitions and hover effects

### **Color Palette**
- **Primary**: Soft greens and blues for calm atmosphere
- **Secondary**: Neutral grays for text and backgrounds
- **Accent**: Subtle highlights for interactive elements

## 🚀 Deployment Setup

### **Vercel Configuration**
1. **Connect GitHub Repository**
   - Sign in to Vercel with GitHub
   - Import `zen-journal-frontend` repository
   - Vercel auto-detects React app

2. **Environment Variables**
   ```
   REACT_APP_API_URL=https://zen-journal-backend-production.up.railway.app
   ```

3. **Build Settings**
   - **Build Command**: `npm run build`
   - **Output Directory**: `build/`
   - **Install Command**: `npm install`

### **Automatic Deployment**
- **Trigger**: Every push to `master` branch
- **Process**: Install dependencies → Build → Deploy
- **Duration**: ~1-2 minutes
- **URL**: Automatically generated (e.g., `https://your-app.vercel.app`)

## 📁 Git Workflow

### **Repository Setup**
```bash
# Clone the repository
git clone https://github.com/Joshua-Shabu/zen-journal-frontend.git
cd zen-journal-frontend

# Install dependencies
npm install

# Start development server
npm start
```

### **Branch Strategy**
- **master**: Main production branch
- **feature/***: Feature development branches
- **hotfix/***: Emergency fixes

### **Common Git Commands**
```bash
# Check status
git status

# Add changes
git add .
git add specific-file.js

# Commit changes
git commit -m "Descriptive commit message"

# Push to remote
git push origin master

# Pull latest changes
git pull origin master

# Create new branch
git checkout -b feature/new-feature

# Switch branches
git checkout master

# Merge branches
git merge feature/new-feature
```

### **Commit Message Convention**
```
feat: Add new feature
fix: Fix bug in component
docs: Update documentation
style: Improve code formatting
refactor: Refactor existing code
test: Add tests
chore: Update dependencies or tools
```

## 🔧 Development Setup

### **Local Development**
1. **Prerequisites**
   - Node.js 18+ installed
   - Git installed
   - Code editor (VS Code recommended)

2. **Setup Steps**
   ```bash
   # Clone repository
   git clone https://github.com/Joshua-Shabu/zen-journal-frontend.git
   cd zen-journal-frontend

   # Install dependencies
   npm install

   # Create environment file
   echo "REACT_APP_API_URL=http://localhost:5000" > .env

   # Start development server
   npm start
   ```

3. **Development Workflow**
   - Make changes to code
   - Test in browser at `http://localhost:3000`
   - Commit and push changes
   - Vercel automatically deploys

### **Environment Variables**
```bash
# Development (.env)
REACT_APP_API_URL=http://localhost:5000

# Production (Vercel)
REACT_APP_API_URL=https://zen-journal-backend-production.up.railway.app
```

## 🐛 Debugging & Troubleshooting

### **Common Issues**
1. **Build Failures**
   - Check ESLint errors
   - Verify all imports are correct
   - Ensure no syntax errors

2. **API Connection Issues**
   - Verify `REACT_APP_API_URL` is correct
   - Check backend is running
   - Verify CORS configuration

3. **Deployment Issues**
   - Check Vercel deployment logs
   - Verify environment variables
   - Ensure build completes successfully

### **Debugging Tools**
- **React Developer Tools**: Browser extension for React debugging
- **Vercel Logs**: Deployment and runtime logs
- **Browser Console**: Client-side error tracking
- **Network Tab**: API request debugging

## 📱 Performance Optimization

### **Build Optimization**
- **Code Splitting**: Automatic with React.lazy()
- **Tree Shaking**: Unused code removal
- **Image Optimization**: Compressed images
- **Bundle Analysis**: Use `npm run build --analyze`

### **Runtime Performance**
- **React.memo**: Component memoization
- **useCallback**: Function memoization
- **Lazy Loading**: Component lazy loading
- **Image Optimization**: WebP format support

## 🔒 Security Considerations

### **Client-Side Security**
- **JWT Storage**: Secure localStorage usage
- **API Authentication**: Bearer token authentication
- **Input Validation**: Form validation and sanitization
- **XSS Prevention**: React's built-in XSS protection

### **Best Practices**
- **Environment Variables**: Never expose secrets
- **HTTPS Only**: Production uses HTTPS
- **Content Security Policy**: Configure CSP headers
- **Secure Cookies**: HttpOnly, Secure flags

## 🚀 Future Enhancements

### **Planned Features**
- **Offline Support**: Service worker implementation
- **Push Notifications**: Real-time updates
- **Image Editor**: Built-in image editing
- **Export Functionality**: PDF/journal export
- **Multi-language Support**: Internationalization

### **Technical Improvements**
- **TypeScript Migration**: Type safety
- **Testing Suite**: Unit and integration tests
- **PWA Features**: App-like experience
- **Performance Monitoring**: Real user monitoring

## 📞 Support & Maintenance

### **Monitoring**
- **Vercel Analytics**: Performance metrics
- **Error Tracking**: Sentry integration
- **Uptime Monitoring**: Health checks

### **Maintenance Tasks**
- **Dependency Updates**: Regular npm updates
- **Security Patches**: Apply security fixes
- **Performance Reviews**: Regular optimization
- **Code Reviews**: Quality assurance

---

**Last Updated**: January 2026
**Version**: 1.0.0
**Maintainer**: Joshua Shabu
