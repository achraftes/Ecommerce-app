import React from 'react';
import MemoryGame from './MemoryGame';
 // Le composant de jeu que je vous ai fourni précédemment

function GamePage() {
  return (
    <div className="container py-5">
      <h1 className="mb-4 text-center">Jouez et gagnez des réductions !</h1>
      <p className="text-center mb-4">
        Retrouvez les paires de produits et obtenez des réductions sur vos achats.
      </p>
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <MemoryGame />
        </div>
      </div>
    </div>
  );
}

export default GamePage;