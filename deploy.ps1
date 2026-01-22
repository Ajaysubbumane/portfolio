# Portfolio Auto-Deploy Script
# Run this after creating GitHub repo and having your Personal Access Token ready

param(
    [string]$GitHubUsername = $(Read-Host "Enter your GitHub username"),
    [string]$GitHubToken = $(Read-Host "Enter your GitHub Personal Access Token" -AsSecureString)
)

$ErrorActionPreference = "Stop"
$projectRoot = "C:\Users\ajayd\OneDrive\Desktop\port_folio"

Write-Host "🚀 Starting Portfolio Deployment..." -ForegroundColor Green
Write-Host ""

# Step 1: Navigate to project
Write-Host "📁 Setting up git..." -ForegroundColor Cyan
cd $projectRoot

# Step 2: Configure git credentials
Write-Host "🔐 Configuring GitHub credentials..." -ForegroundColor Cyan
$BSTR = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($GitHubToken)
$token = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR)

# Store token in git credential helper
$null = git config --global credential.helper wincred

# Step 3: Add remote and push
Write-Host "📤 Pushing code to GitHub..." -ForegroundColor Cyan
$repoUrl = "https://$GitHubUsername:$token@github.com/$GitHubUsername/portfolio.git"

try {
    git remote remove origin 2>$null
    git remote add origin $repoUrl
    git branch -M main
    git push -u origin main
    Write-Host "✅ Code pushed to GitHub successfully!" -ForegroundColor Green
} catch {
    Write-Host "❌ Error pushing to GitHub: $_" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Yellow
Write-Host "✅ NEXT STEPS - DO THESE MANUALLY:" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Yellow
Write-Host ""
Write-Host "1️⃣  DEPLOY BACKEND (Render.com)" -ForegroundColor Cyan
Write-Host "   • Go to: https://render.com"
Write-Host "   • Sign in with GitHub"
Write-Host "   • Click 'New' → 'Web Service'"
Write-Host "   • Select 'portfolio' repo"
Write-Host "   • Set Root Directory: 'backend'"
Write-Host "   • Build Command: 'pip install -r requirements.txt'"
Write-Host "   • Start Command: 'python app.py'"
Write-Host "   • Add Env Variables (from .env.example)"
Write-Host "   • Click 'Create Web Service'"
Write-Host "   • Save your Backend URL (e.g., https://portfolio-backend.onrender.com)"
Write-Host ""

Write-Host "2️⃣  DEPLOY FRONTEND (Vercel)" -ForegroundColor Cyan
Write-Host "   • Go to: https://vercel.com"
Write-Host "   • Sign in with GitHub"
Write-Host "   • Click 'Add New' → 'Project'"
Write-Host "   • Select 'portfolio' repo"
Write-Host "   • Set Root Directory: 'frontend'"
Write-Host "   • Add Env Var: REACT_APP_API_URL = (your backend URL)"
Write-Host "   • Click 'Deploy'"
Write-Host ""

Write-Host "3️⃣  UPDATE API URL" -ForegroundColor Cyan
Write-Host "   • Edit: frontend/src/api.js"
Write-Host "   • Replace: const API_BASE_URL = '(your Render backend URL)/api'"
Write-Host "   • Run: git add . && git commit -m 'Update API URL' && git push"
Write-Host "   • Vercel will auto-redeploy!"
Write-Host ""

Write-Host "✅ Done! Your portfolio will be live shortly!" -ForegroundColor Green
