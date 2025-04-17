import React, { useState } from 'react';
import { Chessboard } from 'react-chessboard';  // Import de la bibliothèque
import { Button, Container, Row, Col, Alert } from 'react-bootstrap';

function ChessGame() {
  const [gameState, setGameState] = useState({
    fen: 'start',  // Position de départ
    orientation: 'white',  // Orientation des pièces (blanc ou noir)
  });

  const handleDrop = ({ piece, targetSquare }) => {
    // Gestion du déplacement d'une pièce
    console.log('Pièce:', piece);
    console.log('Cible:', targetSquare);

    // Logique pour vérifier si le coup est valide et mettre à jour l'état du jeu
    const newFen = calculateNewFen(piece, targetSquare);  // Utilisez une fonction qui met à jour le FEN
    if (newFen) {
      setGameState(prevState => ({
        ...prevState,
        fen: newFen,
        orientation: prevState.orientation === 'white' ? 'black' : 'white',  // Alterner entre les joueurs
      }));
    }
  };

  const handleReset = () => {
    setGameState({
      fen: 'start',  // Réinitialisation à la position de départ
      orientation: 'white',
    });
  };

  // Fonction fictive pour simuler la mise à jour du FEN après un mouvement
  const calculateNewFen = (piece, targetSquare) => {
    // Cette logique devrait être remplacée par une gestion des coups de manière réelle
    // Retourner un FEN simulé pour l'exemple
    return 'start';  // Vous devrez remplacer cela par la logique réelle pour obtenir un FEN valide après un coup
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
