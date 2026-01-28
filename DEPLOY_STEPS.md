# 🚀 DEPLOYMENT GUIDE - COMPLETE STEPS

## Current Status
✅ Project is on GitHub: https://github.com/Ajaysubbumane/portfolio
✅ Backend Flask app configured with email integration
✅ Frontend React app ready for deployment
✅ Environment variables configured for both dev and prod

## 📋 DEPLOYMENT CHECKLIST

### STEP 1: Deploy Backend to Render.com

**Time: ~10 minutes**

1. Go to https://render.com
2. Sign up/Login with GitHub
3. Click **New +** → **Web Service**
4. Select your `portfolio` repository
5. Click **Connect**

**Fill in these settings:**
- **Name**: `portfolio-backend`
- **Runtime**: `Python 3`
- **Root Directory**: `backend`
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `python app.py`

**Add Environment Variables:**
- `FLASK_ENV`: `production`
- `FLASK_APP`: `app.py`
- `MAIL_SERVER`: `smtp.gmail.com`
- `MAIL_PORT`: `587`
- `MAIL_USE_TLS`: `True`
- `MAIL_USERNAME`: `ajaydevadiga600@gmail.com`
- `MAIL_PASSWORD`: `hvaabfhvdnpdrjef`
- `MAIL_DEFAULT_SENDER`: `ajaydevadiga600@gmail.com`
- `ADMIN_EMAIL`: `ajaydevadiga600@gmail.com`

6. Click **Create Web Service**
7. Wait for deployment (~3 minutes)
8. **Copy the backend URL** (will look like: `https://portfolio-backend.onrender.com`)

---

### STEP 2: Update API URL for Production

**Time: ~2 minutes**

1. Update the backend URL in your code
2. Edit `frontend/src/api.js`
3. The file now reads from `REACT_APP_API_URL` environment variable

---

### STEP 3: Deploy Frontend to Vercel

**Time: ~10 minutes**

1. Go to https://vercel.com
2. Sign up/Login with GitHub
3. Click **Add New...** → **Project**
4. Select **Import Git Repository** → Choose `portfolio`

**Fill in these settings:**
- **Framework Preset**: `Create React App`
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `build`

**Add Environment Variables:**
- `REACT_APP_API_URL`: `https://portfolio-backend.onrender.com/api`

(Replace with your actual Render backend URL from Step 1)

5. Click **Deploy**
6. Wait for deployment (~2 minutes)
7. **Copy the frontend URL** (will look like: `https://portfolio-xxxxx.vercel.app`)

---

### STEP 4: Test Your Deployment

1. Visit your Vercel frontend URL
2. Navigate through all pages
3. Test contact form
4. Verify projects display correctly
5. Check that all API calls work

---

## 🔗 YOUR DEPLOYMENT URLS

Once deployed, update these links everywhere:

| Component | URL |
|-----------|-----|
| **Backend API** | `https://portfolio-backend.onrender.com` |
| **Frontend** | `https://portfolio-[random].vercel.app` |

---

## 📝 AFTER DEPLOYMENT

### Update Social Links (if needed)
Edit `backend/portfolio_data.json` to add:
- Your GitHub URL
- Your LinkedIn URL
- Your Twitter URL

### Email Configuration
The contact form uses Gmail SMTP. Make sure:
- Gmail 2FA is enabled
- App password is generated and correct
- Less secure apps access is not needed (using app password instead)

### Custom Domain (Optional)
Both Render and Vercel support custom domains. See their documentation for setup.

---

## ✨ SUMMARY

Your portfolio is now:
- **Live on the web** - Accessible 24/7
- **Backend on Render** - Auto-deployed with your code
- **Frontend on Vercel** - Optimized for speed
- **Email integration** - Contact form works!
- **Admin panel** - Manage projects without code changes

**Congratulations! 🎉 Your portfolio is deployed!**

---

## 🆘 TROUBLESHOOTING

### Frontend can't reach backend
- Check Render backend URL is correct in REACT_APP_API_URL
- Ensure CORS is enabled in Flask backend (it is by default)

### Contact form not sending emails
- Verify Gmail app password in Render environment variables
- Check 2FA is enabled on Gmail
- Verify sender email is correct

### Build fails on Vercel
- Check that `npm run build` works locally: `cd frontend && npm run build`
- Ensure all dependencies are in package.json

### Backend crashes on Render
- Check that `python app.py` works locally in backend folder
- Verify all Python packages are in requirements.txt

---

## 📚 USEFUL LINKS

- Render Dashboard: https://dashboard.render.com
- Vercel Dashboard: https://vercel.com/dashboard
- GitHub Repository: https://github.com/Ajaysubbumane/portfolio
- Flask Documentation: https://flask.palletsprojects.com
- React Documentation: https://react.dev

---

**Created:** January 28, 2026  
**Project:** Portfolio Website  
**Status:** Ready for Deployment
