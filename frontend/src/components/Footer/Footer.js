import React from 'react'
import "./Footer.css";
function Footer() {
  return (
    <div>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>About Us</h3>
            <p>Zero Waste Kitchen is on a mission to reduce food waste and promote sustainable living.</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#features">Features</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="https://aashish-thapa.com.np">Contact</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Follow The Developer</h3>
            <div className="social-icons">
              <a href="https://github.com/aashish-thapa" target="_blank" rel="noopener noreferrer">🌐 Github</a>
              <a href="https://www.linkedin.com/in/iamaashishthapa/" target="_blank" rel="noopener noreferrer">🌐 LinkedIn</a>
              
              <a href="https://instagram.com/iamaashishthapa" target="_blank" rel="noopener noreferrer">🌐 Instagram</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Zero Waste Kitchen. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Footer
