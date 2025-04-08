import React from 'react';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        {/* Section principale */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* À propos */}
          <div>
            <h3 className="text-xl font-bold mb-4">Notre Boutique</h3>
            <p className="text-gray-300 mb-4">
              Nous proposons des produits de qualité pour tous vos besoins.
              Notre mission est de vous offrir le meilleur service client
              avec des produits exceptionnels.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Liens rapides */}
          <div>
            <h3 className="text-xl font-bold mb-4">Liens Rapides</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white">Accueil</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Produits</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Promotions</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Nouveautés</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Blog</a></li>
            </ul>
          </div>
          
          {/* Service client */}
          <div>
            <h3 className="text-xl font-bold mb-4">Service Client</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white">Mon Compte</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Suivi de Commande</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">FAQ</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Conditions Générales</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Politique de Retour</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contactez-nous</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-300">123 Rue du Commerce, 75000 Paris, France</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-2 flex-shrink-0" />
                <span className="text-gray-300">+33 1 23 45 67 89</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-2 flex-shrink-0" />
                <span className="text-gray-300">contact@votreboutique.fr</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Section newsletter */}
        <div className="border-t border-gray-700 pt-8 pb-6">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-xl font-bold mb-4">Inscrivez-vous à notre Newsletter</h3>
            <p className="text-gray-300 mb-4">Recevez nos dernières offres et actualités</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-grow px-4 py-2 rounded-l focus:outline-none text-gray-900"
              />
              <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r font-medium">
                S'inscrire
              </button>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-700 pt-6 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Votre Boutique. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;