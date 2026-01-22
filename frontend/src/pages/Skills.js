import React, { useState, useEffect } from 'react';
import api from '../api';
import './Skills.css';

function Skills() {
  const [skills, setSkills] = useState(null);
  const [activeCategory, setActiveCategory] = useState('frontend');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSkill, setNewSkill] = useState({
    category: 'frontend',
    skill: ''
  });

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await api.get('/skills');
      setSkills(response.data);
    } catch (error) {
      console.error('Error fetching skills:', error);
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

  const handleAddSkill = async () => {
    if (!newSkill.skill.trim()) {
      alert('Please enter a skill name');
      return;
    }

    try {
      await api.post('/skills', {
        category: newSkill.category,
        skill: newSkill.skill.trim()
      });
      
      setNewSkill({
        category: 'frontend',
        skill: ''
      });
      setShowAddForm(false);
      fetchSkills();
      alert('Skill added successfully!');
    } catch (error) {
      console.error('Error adding skill:', error.response?.data || error.message);
      alert(`Error adding skill: ${error.response?.data?.error || error.message}`);
    }
  };

  const handleRemoveSkill = async (category, skillName) => {
    if (window.confirm(`Remove "${skillName}" from ${category}?`)) {
      try {
        console.log(`Deleting skill: ${skillName} from ${category}`);
        const response = await api.delete('/skills', {
          data: {
            category: category,
            skill: skillName
          }
        });
        console.log('Delete response:', response.data);
        fetchSkills();
        alert('Skill removed successfully!');
      } catch (error) {
        console.error('Error removing skill:', error.response?.data || error.message);
        alert(`Error removing skill: ${error.response?.data?.error || error.message}`);
        fetchSkills();
      }
    }
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    setShowAddForm(false);
    setAdminPassword('');
  };

  if (!skills) return <div className="loading">Loading...</div>;

  const categories = [
    { key: 'frontend', label: 'Frontend Development' },
    { key: 'backend', label: 'Backend Development' },
    { key: 'database', label: 'Database & Data' },
    { key: 'tools', label: 'Tools & Platforms' }
  ];

  return (
    <section className="skills-section">
      <div className="skills-container">
        {/* Header */}
        <div className="skills-header">
          <h1 className="skills-title">Technical Expertise</h1>
          <p className="skills-subtitle">Professional technology stack and tools</p>
          <div className="header-line"></div>
        </div>

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
                  <p>Enter your password to manage skills</p>
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
                  <div className="admin-welcome-icon">⚡</div>
                  <h3>Skills Manager</h3>
                  <p>Add and remove your technical skills</p>
                </div>
                
                {!showAddForm ? (
                  <button className="admin-btn-add" onClick={() => setShowAddForm(true)}>
                    <span className="btn-icon">➕</span>
                    <span>Add New Skill</span>
                  </button>
                ) : (
                  <div className="add-skill-form">
                    <h4>⭐ Add Skill</h4>
                    <select
                      value={newSkill.category}
                      onChange={(e) => setNewSkill({...newSkill, category: e.target.value})}
                      className="form-select"
                    >
                      <option value="frontend">Frontend Development</option>
                      <option value="backend">Backend Development</option>
                      <option value="database">Database & Data</option>
                      <option value="tools">Tools & Platforms</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Skill Name (e.g., React, Python)"
                      value={newSkill.skill}
                      onChange={(e) => setNewSkill({...newSkill, skill: e.target.value})}
                      className="form-input"
                      onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                    />
                    <div className="form-buttons">
                      <button className="admin-btn-submit" onClick={handleAddSkill}>
                        ✅ Add Skill
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

        {/* Category Tabs */}
        <div className="category-tabs">
          {categories.map(category => (
            <button
              key={category.key}
              className={`tab-button ${activeCategory === category.key ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.key)}
            >
              <span className="tab-label">{category.label}</span>
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="skills-content">
          {categories.map((category) => (
            <div
              key={category.key}
              className={`skills-category ${activeCategory === category.key ? 'active' : ''}`}
            >
              <div className="skills-grid">
                {skills[category.key].map((skill, skillIdx) => (
                  <div
                    key={skillIdx}
                    className="skill-card"
                    style={{ animationDelay: `${skillIdx * 0.06}s` }}
                  >
                    <div className="skill-badge">
                      {skill}
                      {isAdminLoggedIn && (
                        <button 
                          className="skill-remove-btn"
                          onClick={() => handleRemoveSkill(category.key, skill)}
                          title="Remove skill"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
