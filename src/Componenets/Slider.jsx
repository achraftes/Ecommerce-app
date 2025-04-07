import React from 'react';
import './Slider.css'; // N'oubliez pas de créer ce fichier CSS

function Slider() {
    return (
        <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src="istockpho-1024x1024.jpg" className="d-block w-100" alt="New Collection" />
                    <div className="carousel-caption d-flex flex-column justify-content-center h-100">
                        <div className="slider-content text-start">
                            <span className="subtitle">Nouveautés 2025</span>
                            <h2 className="title">COLLECTIONS EXCLUSIVES</h2>
                            <p className="description">Découvrez nos dernières tendances avec jusqu'à 40% de réduction</p>
                            <div className="btn-wrapper">
                                <a href="/collections" className="btn btn-primary">ACHETER MAINTENANT</a>
                                <a href="/about" className="btn btn-outline">EN SAVOIR PLUS</a>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="carousel-item">
                    <img src="istockpho-1024x1024.jpg" className="d-block w-100" alt="Tech Products" />
                    <div className="carousel-caption d-flex flex-column justify-content-center h-100">
                        <div className="slider-content text-center">
                            <span className="subtitle">TECHNOLOGIE DE POINTE</span>
                            <h2 className="title">INNOVATION ÉLECTRONIQUE</h2>
                            <p className="description">Les dernières innovations au meilleur prix garanti</p>
                            <div className="btn-wrapper">
                                <a href="/" className="btn btn-primary">VOIR LES PRODUITS</a>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="carousel-item">
                    <img src="istockpho-1024x1024.jpg" className="d-block w-100" alt="Special Offer" />
                    <div className="carousel-caption d-flex flex-column justify-content-center h-100">
                        <div className="slider-content text-end">
                            <span className="subtitle">OFFRE LIMITÉE</span>
                            <h2 className="title">SOLDES FLASH</h2>
                            <p className="description">Profitez de -50% sur une sélection d'articles jusqu'à dimanche</p>
                            <div className="countdown-timer">
                                <div className="time-block">
                                    <span className="number">2</span>
                                    <span className="text">Jours</span>
                                </div>
                                <div className="time-block">
                                    <span className="number">18</span>
                                    <span className="text">Heures</span>
                                </div>
                                <div className="time-block">
                                    <span className="number">45</span>
                                    <span className="text">Min</span>
                                </div>
                            </div>
                            <div className="btn-wrapper">
                                <a href="/sale" className="btn btn-primary">PROFITER DE L'OFFRE</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
}

export default Slider;

