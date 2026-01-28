from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from flask_mail import Mail, Message
import os
from datetime import datetime
from dotenv import load_dotenv
import json

# Load environment variables
load_dotenv()

app = Flask(__name__, static_folder='uploads', static_url_path='/uploads')
CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)

# Data persistence file
DATA_FILE = os.path.join(os.getcwd(), 'portfolio_data.json')

# Email configuration
app.config['MAIL_SERVER'] = os.getenv('MAIL_SERVER')
app.config['MAIL_PORT'] = int(os.getenv('MAIL_PORT', 587))
app.config['MAIL_USE_TLS'] = os.getenv('MAIL_USE_TLS', True)
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
app.config['MAIL_DEFAULT_SENDER'] = os.getenv('MAIL_DEFAULT_SENDER')

mail = Mail(app)

# Caching configuration
@app.after_request
def add_header(response):
    """Add caching headers for better performance"""
    if request.path.startswith('/api/'):
        # API responses: cache for 5 minutes
        response.cache_control.max_age = 300
        response.cache_control.public = True
    elif request.path.startswith('/uploads/'):
        # Static assets: cache for 1 day
        response.cache_control.max_age = 86400
        response.cache_control.public = True
    return response

# Configuration for file uploads
UPLOAD_FOLDER = os.path.join(os.getcwd(), 'uploads', 'certificates')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Certificates data (in-memory storage)
certificates_data = [
    {
        "id": 1,
        "title": "Full-Stack Web Development",
        "issuer": "Coursera",
        "year": "2024",
        "certificateImage": None
    },
    {
        "id": 2,
        "title": "Cloud Fundamentals",
        "issuer": "AWS Academy",
        "year": "2023",
        "certificateImage": None
    },
    {
        "id": 3,
        "title": "Data Structures & Algorithms",
        "issuer": "Udemy",
        "year": "2023",
        "certificateImage": None
    }
]

# Admin password (in production, use proper authentication)
ADMIN_PASSWORD = '779506'

# Portfolio data
portfolio_data = {
    "name": "AJAY SUBBUMANE",
    "title": "SOFTWARE DEVELOPER",
    "bio": "Passionate about building web applications with modern technologies.",
    "email": "ajaydevadiga600@gmail.com",
    "phone": "+91 7795068044",
    "location": "Bhatkal, Karnataka, India",
    "social": {
        "github": "https://github.com",
        "linkedin": "https://www.linkedin.com/in/ajay-subbumane-37141b315",
        "twitter": "https://twitter.com"
    },
    "resumeUrl": "/AJAY_CV.pdf"
}

# About data
about_data = {
    "title": "About Me",
    "introduction": "MCA graduate with a strong passion for Python development and software engineering. Fresher eager to apply academic knowledge and build real-world applications with modern technologies.",
    "background": "I specialize in Python backend development, full-stack web development with React & Flask, and software design principles. Committed to writing clean, maintainable code and solving real-world problems.",
    "highlights": [
        "MCA Graduate from ST Aloysius",
        "Python Development Enthusiast",
        "Full-Stack Web Developer",
        "Software Engineering Focused"
    ],
    "education": [
        {
            "degree": "Master of Computer Applications (MCA)",
            "field": "Software Development & Python",
            "institution": "ST Aloysius (Deemed to be University)",
            "year": "2024"
        }
    ]
}

# Projects data
projects_data = [
    {
        "id": 1,
        "title": "E-Commerce Platform",
        "description": "A full-featured e-commerce website with user authentication, product catalog, and payment integration.",
        "longDescription": "Built a complete e-commerce solution with Flask backend and React frontend, featuring user authentication, product management, shopping cart, and Stripe payment integration.",
        "technologies": ["Python", "Flask", "React", "PostgreSQL", "Stripe API"],
        "link": "#",
        "image": "project1.jpg",
        "category": "Web Application"
    },
    {
        "id": 2,
        "title": "Task Management App",
        "description": "A collaborative task management application with real-time updates.",
        "longDescription": "Developed a task management tool allowing users to create, assign, and track tasks in real-time using WebSockets for live updates.",
        "technologies": ["JavaScript", "Node.js", "Express", "MongoDB", "Socket.io"],
        "link": "#",
        "image": "project2.jpg",
        "category": "Web Application"
    },
    {
        "id": 3,
        "title": "Weather Dashboard",
        "description": "A real-time weather application with location-based forecasts.",
        "longDescription": "Built a weather dashboard that provides real-time weather information, 7-day forecasts, and location-based searches using OpenWeather API.",
        "technologies": ["React", "API Integration", "Chart.js", "Geolocation API"],
        "link": "#",
        "image": "project3.jpg",
        "category": "Web Application"
    },
    {
        "id": 4,
        "title": "Mango Leaf Disease Detector",
        "description": "AI-powered deep learning system for detecting and classifying 8 mango leaf diseases with 99.87% accuracy.",
        "longDescription": "A production-ready computer vision system using Swin Transformer Tiny224 to automatically diagnose mango leaf diseases. Features desktop GUI, REST API, and cloud deployment. Detects 8 disease types including Anthracnose, Bacterial Canker, Powdery Mildew, and more. Includes temperature-scaled confidence scores and treatment recommendations. Achieved 99.87% validation accuracy and <100ms inference time. Live deployment with Docker containerization.",
        "technologies": ["TensorFlow", "Keras", "Swin Transformer", "Python", "Flask", "Docker", "OpenCV", "Render Cloud"],
        "link": "https://mango-leaf-disease-detector-1.onrender.com",
        "image": "project4.jpg",
        "category": "Machine Learning"
    },
    {
        "id": 5,
        "title": "CineVerse",
        "description": "Full-stack movie and TV show discovery platform with AI-powered recommendations and rich media integration.",
        "longDescription": "A comprehensive movie and TV show discovery application built with Django REST Framework backend and React 18 frontend. Features JWT-based authentication, TMDB API integration for comprehensive movie metadata, YouTube API for official trailers, and Spotify API for soundtrack recommendations with 30-second audio previews. Implements machine learning-based recommendations using TF-IDF vectorization and cosine similarity for content-based filtering. Users can manage favorites and watchlists, explore trending content, search across catalogs, and receive mood-based AI recommendation suggestions. Includes smart caching strategy to optimize API calls and reduce latency. Admin dashboard for user administration. Production-ready architecture with proper separation of concerns and REST principles.",
        "technologies": ["Django 4.2", "Django REST Framework", "React 18", "Material-UI", "JWT Authentication", "scikit-learn", "TMDB API", "YouTube API", "Spotify API", "MySQL", "Context API", "Axios"],
        "link": "#",
        "image": "project5.jpg",
        "category": "Web Application"
    }
]

# Skills data
skills_data = {
    "frontend": ["React", "JavaScript", "HTML/CSS", "Bootstrap", "Tailwind CSS"],
    "backend": ["Python", "Flask", "Node.js", "JWT Authentication"],
    "database": ["SQL", "Database Design", "SQLite"],
    "tools": ["Git", "GitHub", "VS Code", "Postman", "Docker"]
}

# Experience data
experience_data = [
    {
        "id": 1,
        "company": "Self-Learning & Practice Projects",
        "position": "Fresher Developer",
        "duration": "2024 - Present",
        "description": "Building practical projects to master full-stack development and Python ecosystem.",
        "responsibilities": [
            "Developing Flask REST APIs with Python",
            "Building responsive React frontends",
            "Database design and SQL queries",
            "Git version control and clean code practices"
        ]
    }
]

@app.route('/api/portfolio', methods=['GET'])
def get_portfolio():
    return jsonify(portfolio_data), 200

# ============ DATA PERSISTENCE FUNCTIONS ============

def load_projects():
    """Load projects from JSON file, fallback to default data"""
    global projects_data
    if os.path.exists(DATA_FILE):
        try:
            with open(DATA_FILE, 'r') as f:
                data = json.load(f)
                projects_data = data.get('projects', projects_data)
                print(f"✓ Loaded {len(projects_data)} projects from {DATA_FILE}")
        except Exception as e:
            print(f"⚠ Error loading data from file: {e}. Using default data.")
    else:
        # Create initial data file with default projects
        save_projects()

def save_projects():
    """Save projects to JSON file"""
    try:
        data = {'projects': projects_data}
        with open(DATA_FILE, 'w') as f:
            json.dump(data, f, indent=2)
        print(f"✓ Saved {len(projects_data)} projects to {DATA_FILE}")
    except Exception as e:
        print(f"✗ Error saving data: {e}")

# Load projects on startup
load_projects()

# ============ API ROUTES ============

@app.route('/api/about', methods=['GET'])
def get_about():
    return jsonify(about_data), 200

@app.route('/api/projects', methods=['GET'])
def get_projects():
    global projects_data
    # Always load fresh data from file to ensure consistency
    load_projects()
    return jsonify(projects_data), 200

@app.route('/api/projects', methods=['POST'])
def add_project():
    data = request.json
    
    # Validate required fields
    if not all([data.get('title'), data.get('category'), data.get('description')]):
        return jsonify({"error": "Missing required fields"}), 400
    
    # Create new project
    new_project = {
        "id": max([p['id'] for p in projects_data]) + 1 if projects_data else 1,
        "title": data.get('title'),
        "category": data.get('category'),
        "description": data.get('description'),
        "longDescription": data.get('longDescription', data.get('description')),
        "technologies": data.get('technologies', []),
        "link": data.get('link', '#'),
        "image": "project.jpg"
    }
    
    projects_data.append(new_project)
    save_projects()  # Save to file
    return jsonify(new_project), 201

@app.route('/api/projects/<int:project_id>', methods=['GET'])
def get_project(project_id):
    project = next((p for p in projects_data if p['id'] == project_id), None)
    if project:
        return jsonify(project), 200
    return jsonify({"error": "Project not found"}), 404

@app.route('/api/projects/<int:project_id>', methods=['DELETE'])
def delete_project(project_id):
    try:
        global projects_data
        print(f"\n=== DELETE PROJECT REQUEST ===")
        print(f"Project ID: {project_id}")
        print(f"Current projects: {len(projects_data)}")
        
        project = next((p for p in projects_data if p['id'] == project_id), None)
        
        if not project:
            print(f"Project {project_id} NOT FOUND")
            return jsonify({"error": f"Project with id {project_id} not found"}), 404
        
        print(f"Found project: {project['title']}")
        projects_data.remove(project)
        
        # Renumber remaining projects sequentially
        for idx, proj in enumerate(projects_data, 1):
            proj['id'] = idx
        
        print(f"Project removed. Remaining: {len(projects_data)}")
        print(f"Remaining project IDs (after renumbering): {[p['id'] for p in projects_data]}")
        print(f"=== DELETE COMPLETE ===\n")
        
        save_projects()  # Save to file
        return jsonify({"message": "Project deleted successfully", "id": project_id, "remaining": len(projects_data), "projects": projects_data}), 200
    except Exception as e:
        print(f"ERROR deleting project: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

@app.route('/api/skills', methods=['GET'])
def get_skills():
    return jsonify(skills_data), 200

@app.route('/api/skills', methods=['POST'])
def add_skill():
    data = request.json
    category = data.get('category')
    skill = data.get('skill')
    
    if not category or not skill:
        return jsonify({"error": "Missing required fields"}), 400
    
    if category not in skills_data:
        return jsonify({"error": "Invalid category"}), 400
    
    if skill not in skills_data[category]:
        skills_data[category].append(skill)
    
    return jsonify(skills_data), 201

@app.route('/api/skills', methods=['DELETE'])
def remove_skill():
    try:
        data = request.json
        category = data.get('category')
        skill = data.get('skill')
        
        if not category or not skill:
            return jsonify({"error": "Missing required fields"}), 400
        
        if category not in skills_data:
            return jsonify({"error": "Invalid category"}), 400
        
        if skill not in skills_data[category]:
            return jsonify({"error": f"Skill '{skill}' not found in {category}"}), 404
        
        skills_data[category].remove(skill)
        print(f"Skill '{skill}' removed from {category}")
        return jsonify({"message": "Skill removed successfully", "skills": skills_data}), 200
    except Exception as e:
        print(f"Error removing skill: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/experience', methods=['GET'])
def get_experience():
    return jsonify(experience_data), 200

# Serve uploaded files with caching
@app.route('/uploads/certificates/<filename>')
def serve_certificate(filename):
    try:
        return send_from_directory(UPLOAD_FOLDER, filename, cache_timeout=86400)
    except:
        return jsonify({"error": "File not found"}), 404

@app.route('/api/contact', methods=['POST'])
def contact():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    message = data.get('message')
    
    if not all([name, email, message]):
        return jsonify({"error": "Missing required fields"}), 400
    
    email_sent = False
    messages_log_file = os.path.join(os.getcwd(), 'contact_messages.txt')
    
    try:
        # Try to send via Gmail if password is configured
        mail_password = os.getenv('MAIL_PASSWORD')
        if mail_password and mail_password != 'zzzzzzzzzzzzzzz':
            try:
                admin_email = os.getenv('ADMIN_EMAIL')
                
                # Email to admin
                msg = Message(
                    subject=f'New Contact Form Message from {name}',
                    recipients=[admin_email],
                    html=f"""
                    <h2>New Message from {name}</h2>
                    <p><strong>Email:</strong> {email}</p>
                    <p><strong>Message:</strong></p>
                    <p>{message.replace(chr(10), '<br>')}</p>
                    """
                )
                mail.send(msg)
                
                # Confirmation email to sender
                confirmation_msg = Message(
                    subject='We received your message!',
                    recipients=[email],
                    html=f"""
                    <h2>Thank You, {name}!</h2>
                    <p>We've received your message and will get back to you soon.</p>
                    <p><strong>Your Message:</strong></p>
                    <p>{message.replace(chr(10), '<br>')}</p>
                    <br>
                    <p>Best regards,<br>Ajay Subbumane</p>
                    """
                )
                mail.send(confirmation_msg)
                print(f"✅ Emails sent successfully to {admin_email} and {email}")
                email_sent = True
                
            except Exception as e:
                print(f"⚠️  Gmail send failed: {str(e)}")
                email_sent = False
        
        # Fallback: Save message to file
        try:
            with open(messages_log_file, 'a', encoding='utf-8') as f:
                f.write(f"\n{'='*60}\n")
                f.write(f"Name: {name}\n")
                f.write(f"Email: {email}\n")
                f.write(f"Timestamp: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
                f.write(f"Message:\n{message}\n")
                f.write(f"{'='*60}\n")
            print(f"💾 Message saved to file: {messages_log_file}")
        except Exception as e:
            print(f"❌ Failed to save message: {str(e)}")
        
        # Return success response
        response = {
            "message": "Message received successfully!",
            "email": email,
            "name": name,
            "emailSent": email_sent
        }
        
        if not email_sent:
            response["note"] = "Message saved. To enable Gmail notifications, configure MAIL_PASSWORD in .env"
        
        return jsonify(response), 200
    
    except Exception as e:
        error_msg = str(e)
        print(f"❌ Error: {error_msg}")
        return jsonify({
            "error": f"Failed to process message: {error_msg}",
            "status": "error"
        }), 500

# Certificates API Endpoints
@app.route('/api/certificates', methods=['GET'])
def get_certificates():
    return jsonify(certificates_data), 200

@app.route('/api/certificates', methods=['POST'])
def upload_certificate():
    """Upload a new certificate - Admin only"""
    try:
        # Get form data
        title = request.form.get('title')
        issuer = request.form.get('issuer')
        year = request.form.get('year')
        
        # Validate required fields
        if not all([title, issuer, year]):
            return jsonify({"error": "Missing required fields"}), 400
        
        # Handle file upload (required for certificates)
        if 'certificateImage' not in request.files:
            return jsonify({"error": "Certificate image is required"}), 400
        
        file = request.files['certificateImage']
        if not file or not file.filename:
            return jsonify({"error": "No file selected"}), 400
        
        if not allowed_file(file.filename):
            return jsonify({"error": "Invalid file type. Only PNG, JPG, GIF allowed"}), 400
        
        filename = secure_filename(file.filename)
        import time
        filename = f"{int(time.time())}_{filename}"
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        # Verify file was saved
        if not os.path.exists(filepath):
            return jsonify({"error": "File save failed"}), 500
        
        image_path = f"/uploads/certificates/{filename}"
        app.logger.info(f"Certificate uploaded: {filename} -> {image_path}")
        
        # Create new certificate
        new_id = max([cert.get('id', 0) for cert in certificates_data], default=0) + 1
        new_certificate = {
            "id": new_id,
            "title": title,
            "issuer": issuer,
            "year": year,
            "certificateImage": image_path
        }
        
        certificates_data.append(new_certificate)
        return jsonify(new_certificate), 201
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/certificates/<int:cert_id>', methods=['DELETE'])
def delete_certificate(cert_id):
    """Delete a certificate - Admin only"""
    global certificates_data
    
    cert = next((c for c in certificates_data if c['id'] == cert_id), None)
    if not cert:
        return jsonify({"error": "Certificate not found"}), 404
    
    # Delete image file if exists
    if cert.get('certificateImage'):
        try:
            image_path = cert['certificateImage'].lstrip('/')
            if os.path.exists(image_path):
                os.remove(image_path)
        except Exception as e:
            print(f"Error deleting image: {e}")
    
    certificates_data = [c for c in certificates_data if c['id'] != cert_id]
    return jsonify({"message": "Certificate deleted successfully"}), 200

if __name__ == '__main__':
    # Get port from environment variable or default to 5000
    port = int(os.getenv('PORT', 5000))
    # Listen on all interfaces (0.0.0.0) for cloud deployment
    app.run(host='0.0.0.0', port=port, debug=False)
