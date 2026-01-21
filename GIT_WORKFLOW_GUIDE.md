# Git Workflow & Deployment Guide

## 📋 Overview

This guide explains how Git works, how to connect your code to GitHub, and how the automatic deployment system works for both frontend and backend.

## 🔄 Git Basics

### **What is Git?**
Git is a distributed version control system that tracks changes in your code over time. It allows multiple developers to work on the same project and maintains a complete history of all changes.

### **Key Concepts**
- **Repository**: A project folder with Git tracking
- **Commit**: A snapshot of changes with a message
- **Branch**: A separate line of development
- **Merge**: Combining changes from different branches
- **Remote**: A copy of the repository on a server (GitHub)

## 🚀 Getting Started with Git

### **Installation**
```bash
# Install Git (Windows)
# Download from https://git-scm.com/

# Install Git (Mac)
brew install git

# Install Git (Linux)
sudo apt-get install git

# Configure Git
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### **Basic Git Commands**
```bash
# Initialize a new repository
git init

# Clone an existing repository
git clone https://github.com/username/repository.git

# Check repository status
git status

# Add files to staging area
git add .
git add filename.js

# Commit changes
git commit -m "Your commit message"

# Push changes to remote
git push origin master

# Pull changes from remote
git pull origin master

# View commit history
git log

# View differences
git diff
```

## 🌐 GitHub Integration

### **What is GitHub?**
GitHub is a web-based hosting service for Git repositories. It provides:
- **Remote storage** for your code
- **Collaboration tools** for teams
- **Issue tracking** and project management
- **Continuous integration** and deployment

### **Connecting Local Repository to GitHub**

#### **Method 1: Clone Existing Repository**
```bash
# Clone the repository
git clone https://github.com/Joshua-Shabu/zen-journal-frontend.git
cd zen-journal-frontend

# Make changes
# ... edit files ...

# Commit and push
git add .
git commit -m "Your changes"
git push origin master
```

#### **Method 2: Add Remote to Existing Repository**
```bash
# Initialize repository (if not already done)
git init

# Add remote repository
git remote add origin https://github.com/Joshua-Shabu/zen-journal-frontend.git

# Add files and commit
git add .
git commit -m "Initial commit"

# Push to GitHub
git push -u origin master
```

### **GitHub Authentication**
```bash
# Method 1: Personal Access Token
# Generate token in GitHub Settings > Developer settings > Personal access tokens
# Use token as password when pushing

# Method 2: SSH Key
ssh-keygen -t rsa -b 4096 -C "your.email@example.com"
# Add public key to GitHub Settings > SSH and GPG keys

# Method 3: GitHub CLI
gh auth login
```

## 🌿 Branch Management

### **Branch Strategy**
```
master (main)
├── develop
│   ├── feature/user-authentication
│   ├── feature/journal-entries
│   └── feature/image-upload
└── hotfix/critical-bug-fix
```

### **Branch Commands**
```bash
# Create new branch
git checkout -b feature/new-feature

# Switch to existing branch
git checkout master

# List all branches
git branch -a

# Delete branch
git branch -d feature/new-feature

# Merge branch
git checkout master
git merge feature/new-feature

# Push branch to remote
git push origin feature/new-feature
```

### **Branch Naming Conventions**
- `feature/feature-name`: New features
- `bugfix/bug-description`: Bug fixes
- `hotfix/urgent-fix`: Critical fixes
- `release/version-number`: Release preparation

## 🔄 Pull and Push Workflow

### **Daily Development Workflow**
```bash
# 1. Start with latest changes
git pull origin master

# 2. Create feature branch
git checkout -b feature/new-feature

# 3. Make changes
# ... edit files ...

# 4. Stage and commit changes
git add .
git commit -m "feat: Add new feature"

# 5. Push branch to remote
git push origin feature/new-feature

# 6. Create Pull Request on GitHub
# 7. After review, merge to master
# 8. Pull latest changes
git pull origin master
```

### **Commit Message Guidelines**
```
feat: Add user authentication
fix: Resolve login bug
docs: Update API documentation
style: Improve code formatting
refactor: Refactor database queries
test: Add unit tests
chore: Update dependencies
```

## 🚀 Automatic Deployment System

### **How It Works**
```
Local Code → Git Push → GitHub → Webhook → Deployment Platform → Live App
```

### **Frontend Deployment (Vercel)**
1. **Trigger**: Push to `master` branch
2. **Process**:
   - Vercel detects push via GitHub webhook
   - Downloads latest code
   - Runs `npm install`
   - Runs `npm run build`
   - Deploys to global CDN
3. **Duration**: ~1-2 minutes
4. **URL**: `https://your-app.vercel.app`

### **Backend Deployment (Railway)**
1. **Trigger**: Push to `master` branch
2. **Process**:
   - Railway detects push via GitHub webhook
   - Downloads latest code
   - Runs `npm install`
   - Restarts Node.js server
   - Updates environment variables if changed
3. **Duration**: ~30-60 seconds
4. **URL**: `https://your-app.up.railway.app`

### **Deployment Configuration**

#### **Vercel Configuration**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    }
  ],
  "env": {
    "REACT_APP_API_URL": "https://zen-journal-backend-production.up.railway.app"
  }
}
```

#### **Railway Configuration**
```json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm start",
    "healthcheckPath": "/"
  }
}
```

## 🔧 Troubleshooting

### **Common Git Issues**

#### **Merge Conflicts**
```bash
# Identify conflicts
git status

# Resolve conflicts in files
# ... edit conflicted files ...

# Mark as resolved
git add conflicted-file.js

# Complete merge
git commit -m "Resolve merge conflicts"
```

#### **Push Rejected**
```bash
# Pull latest changes first
git pull origin master

# Resolve any conflicts
# ... fix conflicts ...

# Push again
git push origin master
```

#### **Detached Head**
```bash
# Check current state
git status

# Return to master
git checkout master

# Or create new branch from detached state
git checkout -b new-branch-name
```

### **Deployment Issues**

#### **Vercel Build Failures**
1. Check Vercel deployment logs
2. Verify all dependencies are installed
3. Check for syntax errors
4. Ensure environment variables are correct

#### **Railway Deployment Failures**
1. Check Railway deployment logs
2. Verify package.json scripts
3. Check environment variables
4. Ensure server starts without errors

## 📊 Monitoring Deployments

### **Vercel Dashboard**
- **Build Status**: Real-time build progress
- **Deployment Logs**: Detailed build information
- **Analytics**: Performance metrics
- **Environment Variables**: Configuration management

### **Railway Dashboard**
- **Service Status**: Server health
- **Deployment Logs**: Build and runtime logs
- **Environment Variables**: Configuration
- **Usage Metrics**: Resource consumption

## 🎯 Best Practices

### **Git Best Practices**
- **Commit often**: Small, frequent commits
- **Write clear messages**: Descriptive commit messages
- **Use branches**: Separate features from main
- **Pull requests**: Code review before merging
- **Keep master clean**: Only deployable code

### **Deployment Best Practices**
- **Test locally**: Push working code
- **Monitor deployments**: Watch for failures
- **Rollback capability**: Keep previous versions
- **Environment separation**: Different configs for dev/prod
- **Security**: Never commit secrets

## 🚀 Advanced Git Features

### **Stashing**
```bash
# Save current work
git stash

# List stashes
git stash list

# Apply stash
git stash pop

# Apply specific stash
git stash apply stash@{0}
```

### **Rebasing**
```bash
# Rebase current branch onto master
git checkout feature-branch
git rebase master

# Interactive rebase
git rebase -i HEAD~3
```

### **Cherry-picking**
```bash
# Apply specific commit to current branch
git cherry-pick commit-hash
```

### **Tagging**
```bash
# Create tag
git tag v1.0.0

# Push tags
git push origin --tags
```

## 📱 Mobile Development

### **GitHub Mobile App**
- **View repositories**: Browse code on mobile
- **Review pull requests**: Code review anywhere
- **Merge branches**: Deploy from mobile
- **Issues tracking**: Manage issues on the go

### **Git on Mobile**
- **Working Copy**: Full Git client for iOS
- **Termux**: Terminal emulator for Android
- **GitHub CLI**: Command-line interface

---

**Last Updated**: January 2026
**Version**: 1.0.0
**Maintainer**: Joshua Shabu
