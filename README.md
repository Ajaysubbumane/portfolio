# Portfolio Website

A modern, fully-functional portfolio website with Flask backend and React frontend. Features dynamic project showcase with 3D animations, admin panel for content management, and Gmail integration.

## 🚀 Quick Start

### Prerequisites
- Python 3.9+
- Node.js & npm
- Virtual environment (Python)

### Installation

1. **Clone/Setup Project**
```bash
cd port_folio
```

2. **Backend Setup**
```bash
cd backend
python -m venv venv
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

pip install -r requirements.txt
```

3. **Frontend Setup**
```bash
cd ../frontend
npm install
```

### Running the Project

**Terminal 1 - Backend:**
```bash
cd backend
python app.py
# Runs on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
# Runs on http://localhost:3000
```

Visit `http://localhost:3000` in your browser!

## 📁 Project Structure

See [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) for detailed directory structure and documentation.

## ✨ Key Features

### 🎨 Design
- Light pink-to-cyan gradient background
- Smooth animations and transitions
- 3D flip card interactions on projects
- Fully responsive (mobile, tablet, desktop)

### 👨‍💼 Portfolio Pages
- **Home** - Hero section with CTA buttons
- **About** - Bio, education, and highlights
- **Projects** - 3D flip cards with filtering (Admin can add projects!)
- **Skills** - Categorized skill showcase
- **Certificates** - Achievement display
- **Contact** - Email form with Gmail integration
- **Testimonials** - Client feedback section

### 🔐 Admin Panel
- **Location**: Projects page (⚙️ Admin button)
- **Password**: `779506`
- **Features**:
  - Add new projects without code
  - Manage project categories
  - Add technologies and project links
  - Real-time updates

### 📧 Contact Form
- Email integration via Gmail SMTP
- Fallback to file storage if email fails
- Stores messages in `contact_messages.txt`
- Validation and error handling

### 🔗 Social Links
- GitHub
- LinkedIn: https://www.linkedin.com/in/ajay-subbumane-37141b315
- Twitter

## 🛠️ Technologies Used

**Backend:**
- Flask 2.3.0
- Flask-CORS 4.0.0
- Flask-Mail 0.9.1
- Python-dotenv 1.0.0

**Frontend:**
- React 18.2.0
- React Router DOM 6.20.0
- Axios 1.4.0
- CSS3 (Animations, Gradients, 3D Transforms)

## 📋 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/portfolio` | Portfolio info |
| GET | `/api/about` | About data |
| GET | `/api/projects` | All projects |
| POST | `/api/projects` | Create project (via admin) |
| GET | `/api/skills` | Skills list |
| GET | `/api/experience` | Experience data |
| POST | `/api/contact` | Submit contact form |
| GET | `/api/certificates` | Certificates list |

## ⚙️ Configuration

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

**Gmail App Password Setup:**
1. Enable 2-factor authentication on your Google account
2. Generate an app-specific password
3. Use that password in .env (NOT your actual Gmail password)

## 📝 Projects Added

### 1. Mango Leaf Disease Detector
- **Category**: AI/ML
- **Technologies**: TensorFlow, Keras, Python, Flask, Docker
- **Accuracy**: 99.87%
- **Link**: https://mango-leaf-disease-detector-1.onrender.com

### 2. CineVerse
- **Category**: Web Application
- **Technologies**: Django, React, JWT, TMDB API, Spotify API
- **Features**: Movie recommendations, AI-powered suggestions
- **Status**: In development

### 3. E-Commerce Platform
- **Technologies**: Flask, React, PostgreSQL, Stripe
- **Features**: User auth, shopping cart, payments

### 4. Task Management App
- **Technologies**: Node.js, React, MongoDB, Socket.io
- **Features**: Real-time collaboration

### 5. Weather Dashboard
- **Technologies**: React, OpenWeather API
- **Features**: Location-based forecasts

## 🔒 Security Notes

⚠️ **Never commit these files:**
- `.env` - Environment variables
- `node_modules/` - NPM packages
- `venv/` - Python virtual environment
- `contact_messages.txt` - User messages

See `.gitignore` for complete list.

## 📊 Project Statistics

- **Backend**: ~420 lines of Python code
- **Frontend**: Multiple React components with 600+ lines of CSS
- **Projects**: 5 showcase projects
- **Certificates**: 3 certifications
- **Skills**: 15+ technologies

## 🚀 Deployment

For production deployment, see [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) "Deployment Considerations" section.

Recommended platforms:
- **Backend**: Render, Railway, Heroku
- **Frontend**: Vercel, Netlify, GitHub Pages

## 📞 Contact

- Email: ajaydevadiga600@gmail.com
- Phone: +91 7795068044
- Location: Bhatkal, Karnataka, India

## 📄 License

This project is open source and available for personal and commercial use.

## Pages & API Endpoints

### API Endpoints Available
- `GET /api/portfolio` - Basic portfolio information
- `GET /api/about` - About page data
- `GET /api/projects` - All projects
- `GET /api/projects/<id>` - Single project details
- `GET /api/skills` - Skills by category
- `GET /api/experience` - Work experience
- `GET /api/testimonials` - Client testimonials
- `POST /api/contact` - Submit contact form

## Installation & Setup

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment:
   - **Windows:**
     ```bash
     venv\Scripts\activate
     ```
   - **Mac/Linux:**
     ```bash
     source venv/bin/activate
     ```

4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Run the Flask server:
   ```bash
   python app.py
   ```
   The backend will be available at `http://localhost:5000`

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```
   The frontend will open at `http://localhost:3000`

## Customization Guide

### Update Your Information

Edit `backend/app.py` to customize:
- Your name, title, and bio
- Email, phone, and location
- Social media links
- Projects (title, description, technologies, links)
- Skills (organized by category)
- Experience (company, position, duration, responsibilities)
- Testimonials (client feedback)
- Education details

### Styling

Customize the design by editing `frontend/src/App.css`:
- Color scheme (gradient colors in variables)
- Typography
- Spacing and layout
- Responsive breakpoints

### Add More Pages

To add a new page:
1. Create a new file in `frontend/src/pages/YourPage.js`
2. Add a new route in `App.js`
3. Add navigation link in `components/Navigation.js`
4. Create corresponding API endpoint in `backend/app.py`

## Running Both Servers

Make sure both servers are running simultaneously:

**Terminal 1 - Backend:**
```bash
cd backend
python app.py
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

The frontend is configured to proxy API requests to the backend at `http://localhost:5000`.

## Technology Stack

### Backend
- Flask 2.3.0
- Flask-CORS 4.0.0
- Python 3.9+
- python-dotenv

### Frontend
- React 18.2.0
- React Router DOM 6.20.0
- Axios 1.4.0
- CSS3 with Flexbox & Grid

## Features in Detail

### Responsive Design
- Mobile-first approach
- Hamburger menu for mobile devices
- Optimized for all screen sizes

### Performance
- Lazy loading of components
- Efficient API calls
- Optimized CSS

### User Experience
- Smooth page transitions
- Form validation and feedback
- Hover effects and animations
- Intuitive navigation

## License

This project is open source and available under the MIT License.

## Support

For issues or questions about the portfolio, please feel free to contact ajaydevadiga600@gmail.com
