import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import myLogo from '../assets/my-logo.png';
import indiaMap from '../assets/india.png'; // Import the India map image
import { Shield, Lock, User, AlertCircle, ChevronDown, Eye, EyeOff, X } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [visitorCount, setVisitorCount] = useState(245678);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // Login Modal States
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [officialType, setOfficialType] = useState('');
  const [officialId, setOfficialId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isErrorShaking, setIsErrorShaking] = useState(false);

  // Hardcoded credentials
  const credentials = {
    police: { id: 'police123', password: 'police@123', path: '/police-dashboard' },
    tahsildar: { id: 'tahsildar123', password: 'tahsildar@123', path: '/tahsildar-dashboard' },
    welfare: { id: 'welfare123', password: 'welfare@123', path: '/welfare-dashboard' },
    collector: { id: 'collector123', password: 'collector@123', path: '/collector-dashboard' },
    treasury: { id: 'treasury123', password: 'treasury@123', path: '/treasury-dashboard' },
  };

  const officialRoles = [
    { value: 'police', label: 'Police Department', color: 'role-blue' },
    { value: 'tahsildar', label: 'Tahsildar Office', color: 'role-green' },
    { value: 'welfare', label: 'Social Welfare Department', color: 'role-purple' },
    { value: 'collector', label: 'District Collector', color: 'role-orange' },
    { value: 'treasury', label: 'Treasury Department', color: 'role-red' },
  ];

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
      setShowScrollTop(scrollTop > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle admin login modal
  const handleAdminLogin = () => {
    navigate('/login');
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
    setOfficialType('');
    setOfficialId('');
    setPassword('');
    setLoginError('');
    document.body.style.overflow = 'unset';
  };

  const triggerErrorAnimation = () => {
    setIsErrorShaking(true);
    setTimeout(() => setIsErrorShaking(false), 400);
  };

  const handleLogin = () => {
    setLoginError('');

    if (!officialType) {
      setLoginError('Please select your department.');
      triggerErrorAnimation();
      return;
    }
    if (!officialId.trim()) {
      setLoginError('Please enter your Official ID.');
      triggerErrorAnimation();
      return;
    }
    if (!password.trim()) {
      setLoginError('Please enter your password.');
      triggerErrorAnimation();
      return;
    }

    const user = credentials[officialType];
    if (user && officialId === user.id && password === user.password) {
      closeLoginModal();
      console.log('Login successful for:', officialType);
    } else {
      setLoginError('Invalid credentials. Please check your ID or password.');
      triggerErrorAnimation();
    }
  };

  // Contact form handling
  const handleContactClick = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'unset';
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    closeModal();
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  // Scroll to top functionality
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Hero slider functionality
  const slides = [
    {
      background: 'slide-1',
      title: 'Direct Benefit Transfer Portal',
      description: 'Empowering Justice through Technology. Seamless implementation of PCR Act, 1955 & PoA Act, 1989',
      buttonText: 'Our Services',
      target: 'services'
    },
    {
      background: 'slide-2',
      title: 'Transparent Welfare Delivery',
      description: 'Real-time fund tracking, secure beneficiary verification, and efficient grievance redressal',
      buttonText: 'Contact Us',
      onClick: handleContactClick
    }
  ];

  const changeSlide = (direction) => {
    setCurrentSlideIndex(prev => {
      let newIndex = prev + direction;
      if (newIndex >= slides.length) newIndex = 0;
      if (newIndex < 0) newIndex = slides.length - 1;
      return newIndex;
    });
  };

  const goToSlide = (index) => {
    setCurrentSlideIndex(index);
  };

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideIndex(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Visitor counter
  useEffect(() => {
    const visitorInterval = setInterval(() => {
      setVisitorCount(prev => prev + Math.floor(Math.random() * 5) + 1);
    }, 5000);
    return () => clearInterval(visitorInterval);
  }, []);

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Data arrays
  const servicesData = [
    {
      icon: '✓',
      title: 'Instant Verification',
      description: 'Automated victim identification and verification through Aadhaar integration. Ensures accurate beneficiary selection and prevents fraudulent claims with real-time database validation.',
    },
    {
      icon: '📊',
      title: 'Fund Tracking',
      description: 'Complete transparency in fund sanction, disbursement, and utilization. Real-time dashboard for monitoring authorities with detailed analytics and reporting capabilities.',
    },
    {
      icon: '🔒',
      title: 'Data Security',
      description: 'Advanced encryption and privacy protocols to protect sensitive beneficiary information. Role-based access control ensures data integrity and confidentiality at all levels.',
    }
  ];

  const statsData = [
    { target: 15000, label: 'Beneficiaries Registered' },
    { target: 450, label: 'Crores Disbursed' },
    { target: 28, label: 'States/UTs Covered' },
    { target: 98, label: '% Digital Processing' }
  ];

  const featuresData = [
    { number: '01', title: 'Beneficiary Registration', description: 'Simple, accessible registration process with Aadhaar-based verification. Mobile and web-based interface with multilingual support for universal accessibility.' },
    { number: '02', title: 'Document Verification', description: 'Integration with DigiLocker and eCourts for automated document verification. Reduces processing time and eliminates manual paperwork requirements.' },
    { number: '03', title: 'Fund Disbursement', description: 'Direct transfer to beneficiary bank accounts through PFMS integration. Real-time tracking and automated reconciliation for complete transparency.' },
    { number: '04', title: 'Grievance Management', description: 'Robust complaint handling system with ticket tracking and escalation mechanisms. Beneficiary feedback module for continuous improvement.' },
    { number: '05', title: 'Analytics Dashboard', description: 'Comprehensive reporting and analytics for monitoring authorities. Real-time insights on disbursements, pending cases, and performance metrics.' },
    { number: '06', title: 'Mobile Application', description: 'Dedicated mobile app for beneficiaries and field officers. Offline capability for remote areas with automatic synchronization when connected.' }
  ];

  const footerLinks = {
    about: {
      title: 'Jan Mitra',
      description: 'The Direct Benefit Transfer Portal is a mission-mode project ensuring transparent and timely delivery of benefits under PCR Act, 1955 and PoA Act, 1989.'
    },
    quickLinks: ['Home', 'About Portal', 'Apply Online', 'Track Application', 'Guidelines & Forms', 'Help & Support'],
    importantLinks: ['Ministry of Social Justice', 'PCR Act, 1955', 'PoA Act, 1989', 'RTI Information', 'Grievance Redressal', 'Privacy Policy'],
    contact: {
      organization: 'Ministry of Social Justice & Empowerment',
      address: 'Shastri Bhawan, Dr. Rajendra Prasad Road',
      location: 'New Delhi - 110001, India',
      phone: '+91 11-2338-1000',
      email: 'support@dbt-portal.gov.in',
      helpline: '1800-XXX-XXXX'
    }
  };

  return (
    <div className="jan-mithra-homepage">
      {/* Scroll to Top Button */}
      <button 
        className={`scroll-to-top ${showScrollTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        ↑
      </button>

      {/* Admin Login Modal */}
      <div className={`login-modal-overlay ${isLoginModalOpen ? 'active' : ''}`} onClick={closeLoginModal}>
        <div className="login-modal-container" onClick={(e) => e.stopPropagation()}>
          <button className="login-close-btn" onClick={closeLoginModal} aria-label="Close modal">
            <X size={24} />
          </button>
          
          <div className={`login-modal-content ${isErrorShaking ? 'shake' : ''}`}>
            {/* Header */}
            <div className="login-modal-header">
              <img src={myLogo} alt="Logo" className="login-modal-logo" />
              <div className="login-modal-title">
                <h2>Jan Mitra</h2>
                <p>Official Portal Login</p>
                <span>PCR Act & PoA Act Implementation</span>
              </div>
            </div>

            {/* Login Form */}
            <div className="login-modal-form">
              <div className="login-form-section">
                <h3>Department Login</h3>
                <p>Access your department dashboard</p>
              </div>

              <div className="login-form-fields">
                {/* Department Dropdown */}
                <div className="login-form-group" ref={dropdownRef}>
                  <label>Department / Role</label>
                  <div className="login-dropdown-container">
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="login-dropdown-button"
                      aria-haspopup="listbox"
                      aria-expanded={isDropdownOpen}
                    >
                      <span className={officialType ? 'login-text-selected' : 'login-text-placeholder'}>
                        {officialType
                          ? officialRoles.find((r) => r.value === officialType)?.label
                          : 'Select your department'}
                      </span>
                      <ChevronDown className={`login-dropdown-arrow ${isDropdownOpen ? 'rotate' : ''}`} />
                    </button>

                    {isDropdownOpen && (
                      <div className="login-dropdown-menu" role="listbox">
                        {officialRoles.map((role) => (
                          <button
                            key={role.value}
                            type="button"
                            onClick={() => {
                              setOfficialType(role.value);
                              setIsDropdownOpen(false);
                              setLoginError('');
                            }}
                            className="login-dropdown-item"
                          >
                            <div className={`login-role-color ${role.color}`}></div>
                            <span>{role.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Official ID */}
                <div className="login-form-group">
                  <label>Official ID</label>
                  <div className="login-input-container">
                    <User className="login-input-icon" />
                    <input
                      type="text"
                      value={officialId}
                      onChange={(e) => {
                        setOfficialId(e.target.value);
                        setLoginError('');
                      }}
                      onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                      placeholder="Enter your official ID"
                      className="login-modal-input"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="login-form-group">
                  <label>Password</label>
                  <div className="login-input-container">
                    <Lock className="login-input-icon" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setLoginError('');
                      }}
                      onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                      placeholder="Enter your password"
                      className="login-modal-input"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="login-password-toggle"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Error Message */}
                {loginError && (
                  <div className="login-error-message">
                    <AlertCircle className="login-error-icon" />
                    <span>{loginError}</span>
                  </div>
                )}

                {/* Sign In Button */}
                <button onClick={handleLogin} className="login-modal-button">
                  Sign In
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="login-modal-footer">
              <p>Ministry of Social Justice & Empowerment</p>
              <span>Government of India | Secure Portal</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      <div className={`modal-overlay ${isModalOpen ? 'active' : ''}`} onClick={closeModal}>
        <div className="contact-modal" onClick={(e) => e.stopPropagation()}>
          <button className="close-modal" onClick={closeModal} aria-label="Close modal">
            ×
          </button>
          <h3 style={{ marginBottom: '2rem', textAlign: 'center' }}>Contact Us</h3>
          <form className="contact-form" onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                required
                aria-required="true"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                required
                aria-required="true"
              />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleFormChange}
                required
                aria-required="true"
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleFormChange}
                required
                aria-required="true"
              />
            </div>
            <button type="submit" className="submit-btn">
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Main Navigation with Scroll Effect */}
      <nav className={isScrolled ? 'scrolled' : ''}>
        <div className="logo">
          <img src={myLogo} alt="Jan Mithra Logo" className="logo-icon" />
          <div className="logo-text">
            <h1>Jan Mitra</h1>
            <p>Ministry of Social Justice & Empowerment</p>
          </div>
        </div>

        <div className="nav-links">
          <a href="#home" className="active">Home</a>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#features">Features</a>
          <a href="#contact">Contact</a>
        </div>
        <button className="admin-login-btn" onClick={handleAdminLogin}>
          Admin Login
        </button>
      </nav>

      {/* Hero Slider */}
      <section className="hero-slider" id="home">
        {slides.map((slide, index) => (
          <div 
            key={index}
            className={`slide ${slide.background} ${index === currentSlideIndex ? 'active' : ''}`}
            aria-hidden={index !== currentSlideIndex}
          >
            <div className="slide-content">
              <h1>{slide.title}</h1>
              <p>{slide.description}</p>
              <button 
                className="hero-btn" 
                onClick={slide.onClick || (() => scrollToSection(slide.target))}
              >
                {slide.buttonText}
              </button>
            </div>
          </div>
        ))}
        
        <button 
          className="slider-arrow prev" 
          onClick={() => changeSlide(-1)}
          aria-label="Previous slide"
        >
          ‹
        </button>
        <button 
          className="slider-arrow next" 
          onClick={() => changeSlide(1)}
          aria-label="Next slide"
        >
          ›
        </button>
        
        <div className="slider-nav" aria-label="Slider navigation">
          {slides.map((_, index) => (
            <span 
              key={index}
              className={`slider-dot ${index === currentSlideIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            ></span>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section" id="services">
        <h2 className="section-title">Our Key Services</h2>
        <p className="section-subtitle">Comprehensive digital solutions for welfare delivery</p>
        <div className="services-grid">
          {servicesData.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon" aria-hidden="true">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <a href="#" className="read-more-btn">Read More →</a>
            </div>
          ))}
        </div>
      </section>

      {/* Statistics Section */}
      <section className="stats-section">
        <div className="stats-grid">
          {statsData.map((stat, index) => (
            <div key={index} className="stat-box">
              <span className="stat-number" data-target={stat.target}>0</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* About Section with India Map Image */}
      <section className="about-section" id="about">
        <div className="about-grid">
          <div className="about-content">
            <h2>We are committed to ensuring justice and dignity for all</h2>
            <p>The DBT Portal represents a paradigm shift in welfare delivery for victims of caste-based discrimination and atrocities. Through seamless integration with national databases, real-time processing, and transparent fund tracking, we ensure timely delivery of relief and assistance.</p>
            <p>Our comprehensive digital ecosystem brings together stakeholders across states, districts, and financial institutions to create an efficient, accountable, and inclusive welfare delivery system.</p>
            <button className="about-btn" onClick={handleContactClick}>
              Get Started
            </button>
          </div>
          <div className="about-map-container">
            <img 
              src={indiaMap} 
              alt="India Map - Empowering Justice Across India" 
              className="india-map-image"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '15px'
              }}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" id="features">
        <h2 className="section-title">Implementation Framework</h2>
        <p className="section-subtitle">Comprehensive approach to digital transformation</p>
        <div className="features-grid">
          {featuresData.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-number">{feature.number}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer id="contact">
        <div className="footer-grid">
          <div className="footer-section">
            <h4>{footerLinks.about.title}</h4>
            <p>{footerLinks.about.description}</p>
            <div className="social-links" style={{ marginTop: '1rem' }}>
              <a href="#" aria-label="Facebook">f</a>
              <a href="#" aria-label="Twitter">t</a>
              <a href="#" aria-label="Instagram">📷</a>
              <a href="#" aria-label="LinkedIn">in</a>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              {footerLinks.quickLinks.map((link, index) => (
                <li key={index}><a href="#">{link}</a></li>
              ))}
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Important Links</h4>
            <ul>
              {footerLinks.importantLinks.map((link, index) => (
                <li key={index}><a href="#">{link}</a></li>
              ))}
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Contact Info</h4>
            <p><strong>{footerLinks.contact.organization}</strong></p>
            <p>{footerLinks.contact.address}</p>
            <p>{footerLinks.contact.location}</p>
            <p style={{ marginTop: '1rem' }}>
              <strong>Phone:</strong> {footerLinks.contact.phone}<br />
              <strong>Email:</strong> {footerLinks.contact.email}<br />
              <strong>Helpline:</strong> {footerLinks.contact.helpline}
            </p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>This Portal is developed and maintained by <strong>National Informatics Centre (NIC)</strong>, Ministry of Electronics & Information Technology, Government of India</p>
          <p style={{ marginTop: '1rem' }}>
            &copy; 2025 Ministry of Social Justice & Empowerment. All Rights Reserved. | 
            Visitors: <span id="visitor-count">{visitorCount.toLocaleString()}</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;