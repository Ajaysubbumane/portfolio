# 🚀 DEPLOYMENT GUIDE - VERCEL + RENDER

This guide shows you how to deploy your portfolio online for FREE!

## ✅ PRE-DEPLOYMENT CHECKLIST

- [x] Code is in Git repository locally
- [ ] GitHub account created (https://github.com)
- [ ] Code pushed to GitHub
- [ ] Vercel account created (https://vercel.com)
- [ ] Render account created (https://render.com)

---

## 📤 STEP 1: PUSH CODE TO GITHUB (5 minutes)

### 1.1 Create GitHub Repository
1. Go to https://github.com/new
2. **Repository name**: `portfolio`
3. **Description**: `Full-stack portfolio website`
4. Choose **Public**
5. Click **Create repository**

### 1.2 Push Your Code
Copy this into PowerShell:

```powershell
cd 'C:\Users\ajayd\OneDrive\Desktop\port_folio'
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git branch -M main
git push -u origin main
```

**Replace `YOUR_USERNAME` with your GitHub username**

When prompted for password: Use a **GitHub Personal Access Token**
- Generate at: https://github.com/settings/tokens
- Select: `repo` scope
- Copy token and paste in terminal

✅ **Verify**: Visit `https://github.com/YOUR_USERNAME/portfolio` - You should see all files!

---

## 🌐 STEP 2: DEPLOY BACKEND ON RENDER.COM (10 minutes)

### 2.1 Create Web Service on Render
1. Go to https://render.com
2. Click **Sign up** → **GitHub** → Authorize
3. Click **New +** → **Web Service**
4. Select your `portfolio` repository
5. Click **Connect**

### 2.2 Configure Backend Service
Fill in these settings:

| Field | Value |
|-------|-------|
| **Name** | `portfolio-backend` |
| **Runtime** | `Python 3` |
| **Root Directory** | `backend` |
| **Build Command** | `pip install -r requirements.txt` |
| **Start Command** | `python app.py` |

### 2.3 Add Environment Variables
Click **Environment** and add:
```
MAIL_SERVER = smtp.gmail.com
MAIL_PORT = 587
MAIL_USE_TLS = True
MAIL_USERNAME = your_email@gmail.com
MAIL_PASSWORD = your_gmail_app_password
MAIL_DEFAULT_SENDER = your_email@gmail.com
ADMIN_EMAIL = your_email@gmail.com
```

Get Gmail app password:
1. Enable 2-factor auth on Gmail
2. Go to https://myaccount.google.com/apppasswords
3. Select Mail & Windows
4. Copy the 16-character password

### 2.4 Deploy
Click **Create Web Service** and wait ~3 minutes

✅ **Note**: Your backend URL will be: `https://portfolio-backend.onrender.com`

---

## 🎨 STEP 3: DEPLOY FRONTEND ON VERCEL (5 minutes)

### 3.1 Create Project on Vercel
1. Go to https://vercel.com
2. Click **Sign up** → **GitHub** → Authorize
3. Click **Add New...** → **Project**
4. **Import Git Repository** → Select `portfolio`

### 3.2 Configure Frontend
Settings:

| Field | Value |
|-------|-------|
| **Framework Preset** | `Create React App` |
| **Root Directory** | `frontend` |
| **Build Command** | `npm run build` |
| **Output Directory** | `build` |

### 3.3 Environment Variables
Add:
```
REACT_APP_API_URL = https://portfolio-backend.onrender.com/api
```

### 3.4 Deploy
Click **Deploy** and wait ~2 minutes

✅ **Your frontend is live!** URL: `https://portfolio-{random}.vercel.app`

---

## 🔧 STEP 4: UPDATE API URL IN CODE

Your frontend deployed on Vercel needs to know where your backend is!

### 4.1 Update API URL
Edit `frontend/src/api.js`:

```javascript
const API_BASE_URL = 'https://portfolio-backend.onrender.com/api';
```

Replace with your actual Render URL from Step 2.4

### 4.2 Push Changes
```powershell
cd 'C:\Users\ajayd\OneDrive\Desktop\port_folio'
git add .
git commit -m "Update API URL for production deployment"
git push origin main
```

Vercel will **auto-redeploy** when you push! ✨

---

## ✅ VERIFICATION

Test your deployed portfolio:

1. **Visit your Vercel frontend URL**
2. Navigate to **Projects** page
3. Click **Admin** (⚙️)
4. Login with password: `779506`
5. Try adding/removing a project
6. **Refresh page** → Should still be gone ✓

---

## 📊 WHAT YOU GET

✅ **Frontend**: Deployed on Vercel (FREE, global CDN)
✅ **Backend**: Deployed on Render (FREE tier, will sleep after 15 min inactivity)
✅ **Data**: Persists in JSON file on Render
✅ **Domain**: Professional URL (yourdomain.vercel.app)
✅ **SSL/HTTPS**: Automatic

---

## 💡 TIPS

- **Render Backend Sleep**: Add this to wake it up: https://portfolio-backend.onrender.com/api/portfolio
- **Custom Domain**: Add domain in Vercel Settings → Domains
- **Monitoring**: Check logs on Vercel/Render dashboards
- **Updates**: Push to GitHub → Auto-deploy! 🚀

---

## ❓ TROUBLESHOOTING

**Frontend shows 404 errors?**
→ Check API URL is correct in `frontend/src/api.js`

**Backend not responding?**
→ Render free tier sleeps. Visit backend URL to wake it up

**Still having issues?**
→ Check browser console (F12) for error messages

---

## 🎉 CONGRATS!

Your portfolio is now LIVE on the internet! Share your URL with:
- Recruiters
- Friends
- LinkedIn
- Resume/CV

---

**Need help?** Check:
- Render Logs: Dashboard → Select service → Logs
- Vercel Logs: Dashboard → Select project → Deployments → Logs
