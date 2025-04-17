import React, { useState } from 'react';
import { Chessboard } from 'react-chessboard';  // Import de la bibliothèque
import { Button, Container, Row, Col, Alert } from 'react-bootstrap';
import * as Chess from 'chess.js';  // Importation correcte de chess.js

function ChessGame() {
  const [gameState, setGameState] = useState({
    fen: 'start',  // Position de départ
    orientation: 'white',  // Orientation des pièces (blanc ou noir)
  });

  const chess = new Chess(); // Création de l'instance de chess.js

  // Fonction pour gérer le déplacement des pièces
  const handleDrop = ({ sourceSquare, targetSquare, piece }) => {
    const move = chess.move({
      from: sourceSquare,  // Utiliser sourceSquare
      to: targetSquare,  // Utiliser targetSquare
      promotion: 'q',  // Si une pièce atteint la dernière rangée, on la transforme en reine
    });

    if (move) {
      // Si le mouvement est valide, on met à jour le FEN et l'orientation
      setGameState(prevState => ({
        ...prevState,
        fen: chess.fen(),  // Met à jour la position FEN
        orientation: prevState.orientation === 'white' ? 'black' : 'white',  // Alterne entre les joueurs
      }));
    } else {
      alert('Mouvement invalide');
    }
  };

  // Fonction de réinitialisation du jeu
  const handleReset = () => {
    chess.reset();  // Réinitialiser le jeu avec la position de départ
    setGameState({
      fen: 'start',
      orientation: 'white',
    });
  };

  return (
    <Container className="text-center py-5">
      <Row>
        <Col>
          <h2 className="mb-4">Jeu d'Échecs</h2>
          <p className="lead mb-4">Jouez à un jeu d'échecs en ligne!</p>

          <Chessboard
            position={gameState.fen}  // Position actuelle du jeu
            onPieceDrop={handleDrop}  // Gestion des déplacements des pièces
            boardOrientation={gameState.orientation}  // Orientation du plateau
            darkSquareStyle={{ backgroundColor: '#5c4033' }}  // Style pour les cases sombres
            lightSquareStyle={{ backgroundColor: '#eeeed2' }}  // Style pour les cases claires
          />

          <Button
            onClick={handleReset}
            variant="secondary"
            className="mt-4"
            style={{ padding: '10px 30px', fontSize: '16px' }}
          >
            Réinitialiser la partie
          </Button>

          <Alert variant="info" className="mt-3">
            Joueur actuel: {gameState.orientation === 'white' ? 'Blanc' : 'Noir'}
          </Alert>
        </Col>
      </Row>
    </Container>
  );
}

export default ChessGame;
