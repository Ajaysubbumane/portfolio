# Portfolio Project Structure

## Project Overview
A full-stack portfolio application built with Flask (backend) and React (frontend) featuring:
- Dynamic project showcase with 3D flip card animations
- Admin panel for project management
- Contact form with Gmail integration
- Certificate management system
- Responsive design with light pink-to-cyan gradient theme

## Directory Structure

```
port_folio/
├── backend/                    # Flask REST API
│   ├── app.py                 # Main application (400+ lines)
│   ├── requirements.txt        # Python dependencies
│   ├── .env                    # Environment variables (NEVER commit)
│   ├── contact_messages.txt    # Contact form backup (auto-generated)
│   └── uploads/
│       └── certificates/       # Certificate files
│
├── frontend/                   # React SPA
│   ├── src/
│   │   ├── App.js             # Main component
│   │   ├── App.css            # Global styles
│   │   ├── index.js           # Entry point
│   │   ├── index.css          # Base styles
│   │   ├── components/        # Reusable components
│   │   │   ├── Navigation.js  # Header/nav
│   │   │   └── Footer.js      # Footer
│   │   └── pages/             # Page components
│   │       ├── Home.js        # Home page
│   │       ├── About.js       # About page
│   │       ├── Projects.js    # Projects with admin panel
│   │       ├── Projects.css   # Project styles
│   │       ├── Skills.js      # Skills section
│   │       ├── Skills.css
│   │       ├── Contact.js     # Contact form
│   │       ├── Contact.css
│   │       ├── Certificates.js
│   │       ├── Certificates.css
│   │       └── Testimonials.js
│   ├── public/                # Static assets
│   │   ├── index.html
│   │   └── service-worker.js
│   ├── package.json           # Dependencies & scripts
│   ├── package-lock.json      # Lock file
│   └── .env                   # Environment variables (local)
│
├── .github/
│   └── copilot-instructions.md  # AI assistance guide
│
├── README.md                  # Project documentation
└── .gitignore                 # Git ignore rules

```

## Technology Stack

### Backend
- **Framework**: Flask 2.3.0
- **CORS**: Flask-CORS 4.0.0
- **Email**: Flask-Mail 0.9.1 (Gmail SMTP)
- **Environment**: python-dotenv 1.0.0
- **Server**: Python 3.9+

### Frontend
- **Library**: React 18.2.0
- **Router**: React Router DOM 6.20.0
- **HTTP**: Axios 1.4.0
- **Scripts**: React Scripts 5.0.1

## Key Features

### 1. Projects Page
- **3D Flip Card Animation**: Click to flip and see full project details
- **Category Filtering**: Filter projects by type
- **Admin Panel**: Add/manage projects without code
- **Admin Password**: 779506

### 2. Admin Features
- **Project Management**: Add new projects with title, description, technologies, and links
- **Dynamic Categories**: Auto-populates categories from projects
- **Real-time Updates**: New projects appear instantly

### 3. Contact Form
- **Email Integration**: Sends emails via Gmail SMTP
- **Fallback Storage**: Saves messages to contact_messages.txt if email fails
- **Validation**: Required fields validation

### 4. Certificates
- **Admin Upload**: Upload certificate images
- **Display**: Show certificates with metadata
- **Management**: Admin can add/remove certificates

### 5. Social Links
- **GitHub**: https://github.com
- **LinkedIn**: https://www.linkedin.com/in/ajay-subbumane-37141b315
- **Twitter**: https://twitter.com

## Running the Project

### Backend
```bash
cd backend
pip install -r requirements.txt
python app.py
```
Runs on `http://localhost:5000`

### Frontend
```bash
cd frontend
npm install
npm start
```
Runs on `http://localhost:3000` (or 3001 if port busy)

## Environment Variables

### Backend (.env)
```
MAIL_SERVER=smtp.gmail.com
MAIL_PORT=587
MAIL_USE_TLS=True
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
MAIL_DEFAULT_SENDER=your-email@gmail.com
ADMIN_EMAIL=your-email@gmail.com
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/portfolio` | Get portfolio info |
| GET | `/api/about` | Get about data |
| GET | `/api/projects` | Get all projects |
| POST | `/api/projects` | Add new project |
| GET | `/api/projects/<id>` | Get single project |
| GET | `/api/skills` | Get skills data |
| GET | `/api/experience` | Get experience data |
| POST | `/api/contact` | Submit contact form |
| GET | `/api/certificates` | Get certificates |
| POST | `/api/certificates` | Add certificate |
| DELETE | `/api/certificates/<id>` | Delete certificate |

## Security Notes
⚠️ **Never commit .env files to version control**
- Admin passwords stored in memory (use proper auth in production)
- Environment variables loaded from .env
- CORS enabled for development (restrict in production)

## Cleanup & Optimization
- ✅ Removed unused imports (timedelta, secure_filename, send_file)
- ✅ Optimized CORS configuration
- ✅ Added .gitignore with proper patterns
- ✅ Removed unnecessary file upload utilities
- ✅ Clean code structure and organization

## Deployment Considerations
For production deployment:
1. Use environment-based configuration
2. Enable proper authentication (JWT, OAuth)
3. Restrict CORS to specific domains
4. Use proper database (SQL, MongoDB)
5. Enable HTTPS
6. Use WSGI server (Gunicorn, uWSGI)
7. Implement rate limiting
8. Add logging and monitoring

## Future Enhancements
- [ ] Database integration (replace in-memory storage)
- [ ] User authentication
- [ ] Project image uploads
- [ ] Blog section
- [ ] Analytics integration
- [ ] Dark mode toggle
- [ ] Internationalization (i18n)
- [ ] Performance optimization (lazy loading, code splitting)
