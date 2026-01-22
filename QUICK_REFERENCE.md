# 🚀 Quick Reference Guide

## Start Portfolio in 30 Seconds

```bash
# Terminal 1 (Backend)
cd backend && python app.py

# Terminal 2 (Frontend)
cd frontend && npm start

# Open Browser
http://localhost:3000
```

## Admin Access
- **Button**: Click ⚙️ Admin on Projects page
- **Password**: `779506`
- **Features**: Add projects, manage categories, set links

## Key Files to Know

| File | Purpose |
|------|---------|
| `backend/app.py` | All API endpoints |
| `frontend/src/pages/Projects.js` | Admin panel UI |
| `frontend/src/pages/Projects.css` | 3D animations |
| `.env` | Email & secrets (backend) |

## API Endpoints

```
GET  /api/projects          → List all projects
POST /api/projects          → Add new project
GET  /api/portfolio         → Portfolio info
GET  /api/about             → About data
GET  /api/skills            → Skills list
POST /api/contact           → Send contact email
GET  /api/certificates      → Certificates
```

## Configuration

### Email Setup (Gmail)
1. Enable 2FA on Google account
2. Generate app password
3. Copy to `.env` MAIL_PASSWORD

### Social Links
Edit in `backend/app.py` line ~89:
```python
"social": {
    "github": "https://github.com/...",
    "linkedin": "https://www.linkedin.com/in/...",
    "twitter": "https://twitter.com/..."
}
```

## File Structure

```
backend/          → Python Flask API
frontend/src/     → React components
  pages/          → Page components
  components/     → Reusable components
frontend/public/  → Static assets
.env              → Secrets (NEVER commit!)
.gitignore        → Git ignore rules
```

## Common Tasks

### Add a New Project
1. Click ⚙️ Admin button
2. Enter password: `779506`
3. Click "Add New Project"
4. Fill form and submit
5. New project appears instantly!

### Update Social Links
Edit `backend/app.py` line ~89 and restart backend

### Change Admin Password
Edit `backend/app.py` line ~76:
```python
ADMIN_PASSWORD = '779506'  # Change this
```

### Customize Colors
Edit `frontend/src/pages/Projects.css`:
- Line 11: Background gradient
- Line 96: Active tab color
- Line 157: Card styling

## Troubleshooting

### Port Already in Use
React will ask to use port 3001 instead ✅

### Email Not Sending
Check `.env` MAIL_PASSWORD is correct app password

### Admin Panel Not Showing
Try different password or reload page

### Styles Not Updating
Hard refresh browser (Ctrl+Shift+R)

## Documentation Map

```
📖 README.md
   ↳ Quick start & overview

📋 PROJECT_STRUCTURE.md
   ↳ Detailed architecture & API docs

📊 CLEANUP_REPORT.md
   ↳ What was optimized

✅ VALIDATION_CHECKLIST.md
   ↳ Quality assurance report

🎉 FINAL_SUMMARY.md
   ↳ Complete overview

⚡ This file
   ↳ Quick reference
```

## Environment Variables

### Backend (.env)
```env
MAIL_SERVER=smtp.gmail.com
MAIL_PORT=587
MAIL_USE_TLS=True
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
MAIL_DEFAULT_SENDER=your-email@gmail.com
ADMIN_EMAIL=your-email@gmail.com
```

## Useful Commands

```bash
# Backend
cd backend
python app.py              # Start server
pip install -r requirements.txt  # Install packages

# Frontend
cd frontend
npm start                  # Start development
npm run build             # Build for production
npm install               # Install packages

# General
git add .
git commit -m "message"
git push origin main
```

## Performance Tips

- 3D animations use CSS transforms (GPU accelerated)
- Admin panel only loads on click
- API responses cached for 5 minutes
- Responsive design optimized for all screens

## Security Reminders

⚠️ **Never commit:**
- `.env` files
- `node_modules/`
- Python virtual environment
- `contact_messages.txt`

✅ All in `.gitignore` already!

## Project Links

- **Portfolio**: http://localhost:3000
- **Backend**: http://localhost:5000
- **LinkedIn**: https://www.linkedin.com/in/ajay-subbumane-37141b315
- **Email**: ajaydevadiga600@gmail.com

## What's Included

✨ Projects:
- Mango Leaf Disease Detector (AI/ML)
- CineVerse (Full-stack)
- E-Commerce Platform
- Task Management App
- Weather Dashboard

📚 Pages:
- Home (Hero)
- About (Bio)
- Projects (3D cards + admin)
- Skills (Categorized)
- Certificates (Showcase)
- Contact (Email form)
- Testimonials (Feedback)

🎯 Admin Features:
- Add projects
- Manage categories
- Set technologies
- Add project links

## Status

✅ All systems operational
✅ No errors detected
✅ Production ready
✅ Fully documented

---

**Quick troubleshooting?** Check the error message first, then refer to full docs.
