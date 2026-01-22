import React, { useState, useEffect } from 'react';
import api from '../api';
import './Projects.css';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('All');
  const [expandedId, setExpandedId] = useState(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    category: 'Web Application',
    description: '',
    longDescription: '',
    technologies: '',
    link: ''
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get('/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleAdminLogin = () => {
    if (adminPassword === '779506') {
      setIsAdminLoggedIn(true);
      setAdminPassword('');
    } else {
      alert('Invalid password');
      setAdminPassword('');
    }
  };

  const handleAddProject = async () => {
    if (!newProject.title || !newProject.category || !newProject.description) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const projectData = {
        title: newProject.title,
        category: newProject.category,
        description: newProject.description,
        longDescription: newProject.longDescription || newProject.description,
        technologies: newProject.technologies.split(',').map(t => t.trim()).filter(t => t),
        link: newProject.link || '#'
      };

      const response = await api.post('/projects', projectData);
      console.log('Project added:', response.data);
      
      setNewProject({
        title: '',
        category: 'Web Application',
        description: '',
        longDescription: '',
        technologies: '',
        link: ''
      });
      setShowAddForm(false);
      fetchProjects();
      alert('Project added successfully!');
    } catch (error) {
      console.error('Error adding project:', error.response?.data || error.message);
      alert(`Error adding project: ${error.response?.data?.error || error.message}`);
    }
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    setShowAddForm(false);
    setAdminPassword('');
  };

  const handleRemoveProject = async (projectId) => {
    if (window.confirm('Are you sure you want to remove this project?')) {
      try {
        console.log(`Deleting project ID: ${projectId}`);
        
        // Make the DELETE request
        const response = await api.delete(`/projects/${projectId}`);
        console.log('Delete response:', response.data);
        
        // Update state with renumbered projects from backend
        if (response.data.projects) {
          setProjects(response.data.projects);
        } else {
          // Fallback: filter and refresh
          setProjects(prevProjects => prevProjects.filter(p => p.id !== projectId));
          fetchProjects();
        }
        alert('Project removed successfully!');
      } catch (error) {
        console.error('Error removing project:', error);
        const errorMsg = error.response?.data?.error || error.message || 'Unknown error';
        alert(`Error removing project: ${errorMsg}`);
        // Refresh projects on error
        fetchProjects();
      }
    }
  };

  const categories = ['All', ...new Set(projects.map(p => p.category))];
  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <div className="projects-wrapper">
      {/* Hero Section */}
      <div className="projects-hero-section">
        <div className="hero-content">
          <h1 className="hero-title">My Projects</h1>
          <p className="hero-description">Innovative solutions built with modern technologies</p>
        </div>
        <div className="hero-background">
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
          <div className="blob blob-3"></div>
        </div>
      </div>

      <div className="projects-main">
        {/* Admin Button */}
        <div className="admin-button-container">
          <button 
            className="admin-toggle-btn"
            onClick={() => setIsAdminOpen(!isAdminOpen)}
          >
            ⚙️ Admin
          </button>
        </div>

        {/* Admin Panel */}
        {isAdminOpen && (
          <div className="admin-panel">
            {!isAdminLoggedIn ? (
              <div className="admin-login">
                <div className="admin-login-header">
                  <div className="admin-lock-icon">🔐</div>
                  <h3>Admin Access</h3>
                  <p>Enter your password to manage projects</p>
                </div>
                <input
                  type="password"
                  placeholder="Enter password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
                  className="admin-input"
                  autoFocus
                />
                <div className="admin-buttons">
                  <button className="admin-btn-login" onClick={handleAdminLogin}>
                    🔓 Unlock Admin
                  </button>
                  <button className="admin-btn-cancel" onClick={() => setIsAdminOpen(false)}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="admin-content">
                <div className="admin-header">
                  <div className="admin-welcome-icon">✨</div>
                  <h3>Admin Dashboard</h3>
                  <p>Manage your portfolio projects</p>
                </div>
                
                {!showAddForm ? (
                  <button className="admin-btn-add" onClick={() => setShowAddForm(true)}>
                    <span className="btn-icon">➕</span>
                    <span>Add New Project</span>
                  </button>
                ) : (
                  <div className="add-project-form">
                    <h4>✏️ Create New Project</h4>
                    <input
                      type="text"
                      placeholder="Project Title"
                      value={newProject.title}
                      onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                      className="form-input"
                    />
                    <select
                      value={newProject.category}
                      onChange={(e) => setNewProject({...newProject, category: e.target.value})}
                      className="form-select"
                    >
                      <option>Web Application</option>
                      <option>Mobile App</option>
                      <option>AI/ML</option>
                      <option>Machine Learning</option>
                      <option>Desktop App</option>
                      <option>Other</option>
                    </select>
                    <textarea
                      placeholder="Short Description"
                      value={newProject.description}
                      onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                      className="form-textarea"
                      rows="2"
                    />
                    <textarea
                      placeholder="Long Description (optional)"
                      value={newProject.longDescription}
                      onChange={(e) => setNewProject({...newProject, longDescription: e.target.value})}
                      className="form-textarea"
                      rows="3"
                    />
                    <input
                      type="text"
                      placeholder="Technologies (comma-separated: React, Node.js, etc)"
                      value={newProject.technologies}
                      onChange={(e) => setNewProject({...newProject, technologies: e.target.value})}
                      className="form-input"
                    />
                    <input
                      type="text"
                      placeholder="Project Link (optional)"
                      value={newProject.link}
                      onChange={(e) => setNewProject({...newProject, link: e.target.value})}
                      className="form-input"
                    />
                    <div className="form-buttons">
                      <button className="admin-btn-submit" onClick={handleAddProject}>
                        ✅ Create Project
                      </button>
                      <button className="admin-btn-cancel" onClick={() => setShowAddForm(false)}>
                        ❌ Cancel
                      </button>
                    </div>
                  </div>
                )}

                <button className="admin-btn-logout" onClick={handleLogout}>
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        )}

        {/* Filter Tabs */}
        <div className="filter-tabs">
          {categories.map((category) => (
            <button
              key={category}
              className={`tab ${filter === category ? 'active' : ''}`}
              onClick={() => setFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Layout - Masonry Style */}
        <div className="projects-masonry">
          {filteredProjects.map((project, index) => (
            <div 
              key={project.id}
              className={`project-item ${expandedId === project.id ? 'expanded' : ''} item-${index + 1}`}
              onClick={() => setExpandedId(expandedId === project.id ? null : project.id)}
            >
              {isAdminLoggedIn && (
                <button 
                  className="project-remove-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveProject(project.id);
                  }}
                  title="Remove project"
                >
                  ✕
                </button>
              )}
              
              <div className="project-inner">
                {/* Front Side */}
                <div className="project-front">
                  <div className="project-number">{String(project.id).padStart(2, '0')}</div>
                  
                  <h2 className="project-name">{project.title}</h2>
                  
                  <p className="project-category">{project.category}</p>
                  
                  <p className="project-short-desc">{project.description}</p>
                  
                  <div className="tech-list">
                    {project.technologies.slice(0, 3).map((tech, idx) => (
                      <span key={idx} className="tech-pill">{tech}</span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="tech-more">+{project.technologies.length - 3}</span>
                    )}
                  </div>

                  <div className="click-hint">Click to explore</div>
                </div>

                {/* Back Side - Expanded */}
                <div className="project-back">
                  <div className="back-content">
                    <h3>{project.title}</h3>
                    <p className="back-description">{project.longDescription}</p>
                    
                    <div className="back-tech">
                      {project.technologies.map((tech, idx) => (
                        <span key={idx} className="back-tech-badge">{tech}</span>
                      ))}
                    </div>

                    {project.link !== '#' ? (
                      <a 
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="back-link"
                        onClick={(e) => e.stopPropagation()}
                      >
                        View Project ↗
                      </a>
                    ) : (
                      <div className="back-link disabled">Coming Soon</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="empty-state">
            <p>No projects found in this category</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Projects;
