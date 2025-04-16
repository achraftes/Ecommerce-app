import { useState, useEffect } from 'react';

export default function MemoryGame() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Produits avec des couleurs associées
  const products = [
    { id: 1, name: "Chaussures", color: "#FF5733" },
    { id: 2, name: "T-shirt", color: "#33FF57" },
    { id: 3, name: "Pantalon", color: "#3357FF" },
    { id: 4, name: "Montre", color: "#F3FF33" },
    { id: 5, name: "Sac", color: "#FF33F3" },
    { id: 6, name: "Chapeau", color: "#33FFF3" },
  ];

  // Initialiser le jeu
  useEffect(() => {
    initGame();
  }, []);

  const initGame = () => {
    setIsLoading(true);
    // Doubler les cartes pour créer des paires
    const duplicatedCards = [...products, ...products]
      .map(item => ({
        ...item,
        id: `${item.id}-${Math.random().toString(36).substring(2)}`, // ID unique
        isFlipped: false,
        isMatched: false
      }))
      .sort(() => Math.random() - 0.5); // Mélanger les cartes

    setCards(duplicatedCards);
    setFlippedCards([]);
    setMatchedPairs([]);
    setMoves(0);
    setGameOver(false);
    setIsLoading(false);
  };

  // Gérer le clic sur une carte
  const handleCardClick = (id) => {
    // Ignorer si la carte est déjà retournée ou déjà associée
    if (flippedCards.length === 2 || flippedCards.includes(id) || matchedPairs.includes(id)) {
      return;
    }

    // Retourner la carte
    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);

    // Si deux cartes sont retournées, vérifier si elles correspondent
    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      const [firstCardId, secondCardId] = newFlippedCards;
      const firstCard = cards.find(card => card.id === firstCardId);
      const secondCard = cards.find(card => card.id === secondCardId);

      if (firstCard.name === secondCard.name) {
        // Les cartes correspondent
        setMatchedPairs([...matchedPairs, firstCardId, secondCardId]);
        setFlippedCards([]);

        // Vérifier si toutes les paires sont trouvées
        if (matchedPairs.length + 2 === cards.length) {
          setGameOver(true);
        }
      } else {
        // Les cartes ne correspondent pas, les retourner après un délai
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  // Redémarrer le jeu
  const restartGame = () => {
    initGame();
  };

  if (isLoading) {
    return <div className="d-flex justify-content-center align-items-center" style={{ height: "300px" }}>Chargement du jeu...</div>;
  }

  return (
    <div className="p-4 bg-light rounded shadow">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fs-1 fw-bold text-primary">Jeu de Mémoire</h2>
        <div className="d-flex align-items-center gap-3">
          <p className="text-secondary mb-0">Coups: {moves}</p>
          <button 
            onClick={restartGame}
            className="btn btn-primary"
          >
            Recommencer
          </button>
        </div>
      </div>

      {gameOver ? (
        <div className="text-center p-4 bg-success bg-opacity-25 rounded">
          <div className="display-4 mb-2 text-warning">🎉</div>
          <h3 className="fs-3 fw-bold mb-2">Félicitations!</h3>
          <p className="mb-3">Vous avez terminé le jeu en {moves} coups!</p>
          <button 
            onClick={restartGame}
            className="btn btn-success"
          >
            Jouer à nouveau
          </button>
        </div>
      ) : (
        <div className="row row-cols-3 row-cols-md-4 g-3">
          {cards.map(card => {
            const isFlipped = flippedCards.includes(card.id) || matchedPairs.includes(card.id);
            
            return (
              <div key={card.id} className="col">
                <div 
                  onClick={() => handleCardClick(card.id)}
                  className={`card h-100 ${isFlipped ? 'bg-white' : 'bg-primary'} cursor-pointer`}
                  style={{ 
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                >
                  <div className="card-body d-flex flex-column justify-content-center align-items-center">
                    {isFlipped ? (
                      <>
                        <div 
                          className="mb-2 rounded-circle d-flex justify-content-center align-items-center"
                          style={{ 
                            width: '40px', 
                            height: '40px', 
                            backgroundColor: card.color,
                            color: '#fff',
                            fontWeight: 'bold'
                          }}
                        >
                          {card.name.charAt(0).toUpperCase()}
                        </div>
                        <p className="card-text fw-medium text-center mb-0">{card.name}</p>
                      </>
                    ) : (
                      <span className="fs-1 text-white">?</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      
      <div className="mt-3 text-secondary">
        <p>Retrouvez les paires de produits identiques! Un bon score pourrait vous offrir une réduction sur votre prochain achat.</p>
      </div>
    </div>
  );
}