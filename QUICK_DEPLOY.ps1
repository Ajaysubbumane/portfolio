# SIMPLE DEPLOY CHECKLIST
# Copy and paste each section into PowerShell one at a time

# ========== STEP 1: CREATE GITHUB TOKEN ==========
# Go to: https://github.com/settings/tokens
# Click: Generate new token (classic)
# Name: portfolio-deploy
# Check: repo (full control of private repos)
# Click: Generate token
# COPY THE TOKEN (you'll need it in 2 minutes)

# ========== STEP 2: CREATE GITHUB REPO ==========
# Go to: https://github.com/new
# Repository name: portfolio
# Description: Full-stack portfolio website
# Choose: Public
# Click: Create repository

# ========== STEP 3: PUSH CODE (PASTE BELOW) ==========
# Replace YOUR_USERNAME and YOUR_TOKEN with actual values

cd 'C:\Users\ajayd\OneDrive\Desktop\port_folio'
git remote remove origin 2>$null
git remote add origin https://YOUR_USERNAME:YOUR_TOKEN@github.com/YOUR_USERNAME/portfolio.git
git branch -M main
git push -u origin main

# ========== STEP 4: VERIFY ==========
# Visit: https://github.com/YOUR_USERNAME/portfolio
# You should see all your files!

# ========== STEP 5: DEPLOY BACKEND (MANUAL) ==========
# Go to: https://render.com
# Sign in with GitHub
# New > Web Service
# Select: portfolio repo
# Root Directory: backend
# Build: pip install -r requirements.txt
# Start: python app.py
# Add Environment Variables from .env.example
# Click Deploy

# ========== STEP 6: DEPLOY FRONTEND (MANUAL) ==========
# Go to: https://vercel.com
# Sign in with GitHub
# Add Project > Select portfolio repo
# Root Directory: frontend
# Environment Variable: REACT_APP_API_URL = (your Render backend URL)
# Click Deploy

# ========== STEP 7: UPDATE API URL ==========
# Edit: frontend/src/api.js
# Change: const API_BASE_URL = 'https://your-backend.onrender.com/api'
# Then run:

cd 'C:\Users\ajayd\OneDrive\Desktop\port_folio'
git add .
git commit -m "Update API URL for production"
git push origin main

# Done! Your portfolio is LIVE 🎉
