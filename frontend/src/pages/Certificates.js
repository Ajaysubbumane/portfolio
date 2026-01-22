import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Certificates.css';

function Certificates() {
  const [certificates, setCertificates] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    issuer: '',
    year: new Date().getFullYear().toString(),
    certificateImage: null,
    imagePreview: null
  });
  const [uploadLoading, setUploadLoading] = useState(false);

  useEffect(() => {
    fetchCertificates();
    const adminStatus = localStorage.getItem('adminAuth') === 'true';
    setIsAdmin(adminStatus);
  }, []);

  const fetchCertificates = async () => {
    try {
      const response = await axios.get('/api/certificates');
      console.log('Certificates received:', response.data);
      response.data.forEach(cert => {
        console.log(`Certificate "${cert.title}" - Image path: ${cert.certificateImage}`);
      });
      setCertificates(response.data);
    } catch (error) {
      console.error('Error fetching certificates:', error);
      setCertificates([]);
    }
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPassword === '779506') {
      setIsAdmin(true);
      localStorage.setItem('adminAuth', 'true');
      setAdminPassword('');
      setShowUploadForm(true);
    } else {
      alert('Invalid admin password');
      setAdminPassword('');
    }
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('adminAuth');
    setShowUploadForm(false);
    setFormData({
      title: '',
      issuer: '',
      year: new Date().getFullYear().toString(),
      certificateImage: null,
      imagePreview: null
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        certificateImage: file,
        imagePreview: URL.createObjectURL(file)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.issuer || !formData.year) {
      alert('Please fill in all required fields (Certificate Name, Organization, Year)');
      return;
    }

    if (!formData.certificateImage) {
      alert('Please select a certificate image');
      return;
    }

    const data = new FormData();
    data.append('title', formData.title);
    data.append('issuer', formData.issuer);
    data.append('year', formData.year);
    data.append('certificateImage', formData.certificateImage);

    setUploadLoading(true);
    try {
      const response = await axios.post('/api/certificates', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      console.log('Certificate uploaded successfully:', response.data);
      alert('Certificate uploaded successfully!');
      fetchCertificates();
      setFormData({
        title: '',
        issuer: '',
        year: new Date().getFullYear().toString(),
        certificateImage: null,
        imagePreview: null
      });
    } catch (error) {
      console.error('Error uploading certificate:', error);
      const errorMessage = error.response?.data?.error || 'Failed to upload certificate. Please try again.';
      alert(errorMessage);
    } finally {
      setUploadLoading(false);
    }
  };

  const handleDeleteCertificate = async (id) => {
    if (window.confirm('Delete this certificate?')) {
      try {
        await axios.delete(`/api/certificates/${id}`);
        fetchCertificates();
      } catch (error) {
        console.error('Error deleting certificate:', error);
        alert('Failed to delete certificate');
      }
    }
  };

  return (
    <section className="certificates-section">
      <div className="certificates-container">
        <div className="certificates-header">
          <h2 className="certificates-title">Certifications</h2>
          <p className="certificates-subtitle">Professional credentials & achievements</p>
          
          {!isAdmin ? (
            <button className="admin-btn" onClick={() => setShowUploadForm(!showUploadForm)}>
              ▾ Admin
            </button>
          ) : (
            <button className="admin-btn logout" onClick={handleAdminLogout}>
              ✓ Admin Active
            </button>
          )}
        </div>

        {showUploadForm && !isAdmin && (
          <form className="admin-login-form" onSubmit={handleAdminLogin}>
            <div className="login-content">
              <h3>Admin Access</h3>
              <div className="form-group">
                <label htmlFor="admin-password">Password</label>
                <input
                  id="admin-password"
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Enter admin password"
                  required
                  autoFocus
                />
              </div>
              <div className="login-actions">
                <button type="submit" className="form-submit">Login</button>
                <button type="button" className="form-cancel" onClick={() => setShowUploadForm(false)}>Cancel</button>
              </div>
            </div>
          </form>
        )}

        {isAdmin && (
          <form className="certificate-upload-form" onSubmit={handleSubmit}>
            <div className="upload-header">
              <h3>Upload Certificate</h3>
              <p>Add a new professional certificate</p>
            </div>
            
            <div className="upload-main">
              <div className="form-fields">
                <div className="form-group">
                  <label htmlFor="cert-title">Certificate Name</label>
                  <input
                    id="cert-title"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Full-Stack Web Development"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cert-issuer">Issuing Organization</label>
                  <input
                    id="cert-issuer"
                    type="text"
                    name="issuer"
                    value={formData.issuer}
                    onChange={handleInputChange}
                    placeholder="e.g., Udemy, LinkedIn Learning"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cert-year">Year Issued</label>
                  <input
                    id="cert-year"
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    min="2000"
                    max={new Date().getFullYear()}
                    required
                  />
                </div>
              </div>

              <div className="file-upload-area">
                <label htmlFor="cert-image" className="file-label">
                  {formData.imagePreview ? (
                    <div className="preview-container">
                      <img 
                        src={formData.imagePreview} 
                        alt="Preview" 
                        className="preview-image"
                        loading="lazy"
                        decoding="async"
                      />
                      <span className="change-text">Change Image</span>
                    </div>
                  ) : (
                    <div className="upload-placeholder">
                      <div className="upload-icon">↑</div>
                      <p>Click to upload certificate image</p>
                      <span>PNG, JPG, GIF up to 5MB</span>
                    </div>
                  )}
                  <input
                    id="cert-image"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                </label>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="form-submit" disabled={uploadLoading}>
                {uploadLoading ? 'Uploading...' : 'Upload Certificate'}
              </button>
            </div>
          </form>
        )}

        <div className="certificates-gallery">
          {certificates.map((cert, idx) => (
            <div className="certificate-item" key={cert.id || idx}>
              {cert.certificateImage && (
                <div className="cert-image-wrapper">
                  <img 
                    src={cert.certificateImage} 
                    alt={cert.title} 
                    className="cert-image-display"
                    onLoad={() => console.log(`✓ Image loaded: ${cert.certificateImage}`)}
                    onError={() => console.error(`✗ Image failed to load: ${cert.certificateImage}`)}
                  />
                </div>
              )}
              
              <div className="cert-info">
                <h3 className="cert-title-text">{cert.title}</h3>
                <div className="cert-meta">
                  <span className="cert-issuer">{cert.issuer}</span>
                  <span className="cert-year">{cert.year}</span>
                </div>
              </div>

              {isAdmin && (
                <button
                  className="cert-delete-btn"
                  onClick={() => handleDeleteCertificate(cert.id)}
                  title="Delete certificate"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>

        {certificates.length === 0 && (
          <div className="no-certificates">
            <p className="no-cert-text">No certificates yet</p>
            {isAdmin && <p className="no-cert-hint">Upload your first certificate to get started</p>}
          </div>
        )}
      </div>
    </section>
  );
}

export default Certificates;
