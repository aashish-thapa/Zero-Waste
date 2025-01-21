import React from 'react';
import './Home.css';
import Footer from '../../components/Footer/Footer';
import { Link } from 'react-router-dom';

const App = () => {
  const features = [
    {
      title: 'Scan Ingredients',
      description: 'Use AI to recognize ingredients and avoid waste.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa8eWBIqn0VLEMaGQXB0BvJ_v0dK5YBNBH0w&s'
    },
    {
      title: 'Smart Recipes',
      description: 'Get personalized recipes based on what you have.',
      image: 'https://cdn.shopify.com/s/files/1/0267/8118/8171/files/blog-post-image_pressure.png?v=1705433574',
    },
    {
      title: 'Track Usage',
      description: 'Monitor your food usage and minimize waste.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIqgL3V5FE46y1v3Gfyv7j2LZS2A0p7oYNCw&s',
    },
  ];

  return (
    <div className="app">
      <header className="hero">
        <h1 className="hero-title">Zero Waste Kitchen</h1>
        <p className="hero-description">
          Reduce food waste with AI-powered ingredient detection and smart recipes!
        </p>
        <Link to="/camera">
        <button className="cta-button">Get Started</button>
        </Link>
      </header>

      <section className="features">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <img src={feature.image} alt={feature.title} className="feature-image" />
            <h2 className="feature-title">{feature.title}</h2>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </section>
      <Footer />
    </div>
  );
};

export default App;
