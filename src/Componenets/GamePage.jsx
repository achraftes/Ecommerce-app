import React, { useState } from 'react';
import MemoryGame from './MemoryGame';
import WordScramble from './WordScramble';
import ColorMatch from './ColorMatch';
import { Gift, Trophy, Star } from 'lucide-react';

function GamePage() {
  const [selectedGame, setSelectedGame] = useState(null);

  // Configuration des jeux disponibles
  const games = [
    {
      id: 'memory',
      name: 'Jeu de Mémoire',
      description: 'Retrouvez les paires de produits identiques',
      component: MemoryGame,
      color: 'bg-primary', // Remplacé pour Bootstrap
      icon: Gift
    },
    {
      id: 'wordscramble',
      name: 'Mots Mélangés',
      description: 'Devinez le mot correct à partir des lettres mélangées',
      component: WordScramble,
      color: 'bg-success', // Remplacé pour Bootstrap
      icon: Trophy
    },
    {
      id: 'colormatch',
      name: 'Match de Couleurs',
      description: 'Associez les couleurs correspondantes',
      component: ColorMatch,
      color: 'bg-info', // Remplacé pour Bootstrap
      icon: Star
    }
  ];

  // Affiche le jeu sélectionné
  if (selectedGame) {
    const game = games.find(g => g.id === selectedGame);
    const GameComponent = game?.component;

    return (
      <div className="container py-5 px-4">
        <button
          onClick={() => setSelectedGame(null)}
          className="mb-6 px-4 py-2 btn btn-secondary d-flex align-items-center gap-2"
        >
          <span>←</span>
          <span>Retour aux jeux</span>
        </button>
        {GameComponent && <GameComponent />}
      </div>
    );
  }

  // Affiche la liste des jeux
  return (
    <div className="container py-5 px-4">
      <header className="text-center mb-10">
        <h1 className="display-4 font-weight-bold text-dark mb-4">
          Jouez et gagnez des réductions !
        </h1>
        <p className="text-muted lead mx-auto">
          Retrouvez les paires de produits et obtenez des réductions exclusives sur vos prochains achats.
        </p>
      </header>

      <div className="row row-cols-1 row-cols-md-3 g-4">
        {games.map((game) => {
          const Icon = game.icon;
          return (
            <div key={game.id} className="col">
              <button
                onClick={() => setSelectedGame(game.id)}
                className={`card ${game.color} text-white p-4 rounded-3 shadow-lg`}
              >
                <div className="card-body text-center">
                  <Icon className="w-50 h-50 mb-3 animate__animated animate__bounce" />
                  <h5 className="card-title h4">{game.name}</h5>
                  <p className="card-text">{game.description}</p>
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default GamePage;
