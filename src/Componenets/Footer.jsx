import React from 'react';
import './Footer.css';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Section principale */}
        <div className="footer-grid footer-grid-md footer-grid-lg">
          
          {/* À propos */}
          <div>
            <h3 className="footer-title">Notre Boutique</h3>
            <p className="footer-text">
              Nous proposons des produits de qualité pour tous vos besoins.
              Notre mission est de vous offrir le meilleur service client
              avec des produits exceptionnels.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="footer-link">
                <Facebook size={20} />
              </a>
              <a href="#" className="footer-link">
                <Instagram size={20} />
              </a>
              <a href="#" className="footer-link">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Liens rapides */}
          <div>
            <h3 className="footer-title">Liens Rapides</h3>
            <ul className="space-y-2">
              <li><a href="#" className="footer-link">Accueil</a></li>
              <li><a href="#" className="footer-link">Produits</a></li>
              <li><a href="#" className="footer-link">Promotions</a></li>
              <li><a href="#" className="footer-link">Nouveautés</a></li>
              <li><a href="#" className="footer-link">Blog</a></li>
            </ul>
          </div>
          
          {/* Service client */}
          <div>
            <h3 className="footer-title">Service Client</h3>
            <ul className="space-y-2">
              <li><a href="#" className="footer-link">Mon Compte</a></li>
              <li><a href="#" className="footer-link">Suivi de Commande</a></li>
              <li><a href="#" className="footer-link">FAQ</a></li>
              <li><a href="#" className="footer-link">Conditions Générales</a></li>
              <li><a href="#" className="footer-link">Politique de Retour</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="footer-title">Contactez-nous</h3>
            <ul className="space-y-3 footer-contact">
              <li className="footer-contact-item">
                <MapPin size={20} className="footer-contact-icon" />
                <span className="footer-text">123 Rue du Commerce, 75000 Paris, France</span>
              </li>
              <li className="footer-contact-item">
                <Phone size={20} className="footer-contact-icon" />
                <span className="footer-text">+33 1 23 45 67 89</span>
              </li>
              <li className="footer-contact-item">
                <Mail size={20} className="footer-contact-icon" />
                <span className="footer-text">contact@votreboutique.fr</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Section newsletter */}
        <div className="footer-newsletter">
          <div className="max-w-md mx-auto text-center">
            <h3 className="footer-title">Inscrivez-vous à notre Newsletter</h3>
            <p className="footer-text">Recevez nos dernières offres et actualités</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-grow px-4 py-2 rounded-l focus:outline-none text-gray-900"
              />
              <button className="footer-button">
                S'inscrire
              </button>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="footer-copyright">
          <p className="footer-text">
            &copy; {new Date().getFullYear()} Votre Boutique. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
