import React from 'react';
import './About.css'; // Nous allons créer ce fichier CSS

function About() {
  return (
    <div className="about-container">
      <div className="about-header">
        {/* <img src="56.jpg" alt="Notre entreprise" className="about-image" /> */}
        <h1 className="about-title">À Propos de Nous</h1>
      </div>
      
      <div className="about-content">
        <p>Bienvenue sur notre site e-commerce! Nous sommes dédiés à vous fournir les meilleurs produits au meilleur prix.</p>
        
        <p>Notre équipe travaille sans relâche pour s'assurer que votre expérience d'achat est exceptionnelle.</p>
        
        <p>N'hésitez pas à nous contacter si vous avez des questions ou des préoccupations.</p>
        
        <div className="about-values">
          <div className="value-item">
            <h3>Qualité</h3>
            <p>Nous ne proposons que des produits de la plus haute qualité.</p>
          </div>
          
          <div className="value-item">
            <h3>Service</h3>
            <p>Notre service client est disponible 24/7 pour vous aider.</p>
          </div>
          
          <div className="value-item">
            <h3>Innovation</h3>
            <p>Nous recherchons constamment de nouveaux produits pour vous.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;