import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

export default function MemoryGame() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Images de produits (à remplacer par vos propres produits)
  const productImages = [
    { id: 1, name: "Chaussures" },
    { id: 2, name: "T-shirt" },
    { id: 3, name: "Pantalon" },
    { id: 4, name: "Montre" },
    { id: 5, name: "Sac" },
    { id: 6, name: "Chapeau" },
  ];

  // Initialiser le jeu
  useEffect(() => {
    initGame();
  }, []);

  const initGame = () => {
    setIsLoading(true);
    // Doubler les cartes pour créer des paires
    const duplicatedCards = [...productImages, ...productImages]
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
    return <div className="flex justify-center items-center h-64">Chargement du jeu...</div>;
  }

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-blue-600">Jeu de Mémoire</h2>
        <div className="flex items-center gap-4">
          <p className="text-gray-700">Coups: {moves}</p>
          <button 
            onClick={restartGame}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Recommencer
          </button>
        </div>
      </div>

      {gameOver ? (
        <div className="text-center p-6 bg-green-100 rounded-lg">
          <Sparkles className="mx-auto mb-2 text-yellow-500" size={40} />
          <h3 className="text-xl font-bold mb-2">Félicitations!</h3>
          <p className="mb-4">Vous avez terminé le jeu en {moves} coups!</p>
          <button 
            onClick={restartGame}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            Jouer à nouveau
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
          {cards.map(card => {
            const isFlipped = flippedCards.includes(card.id) || matchedPairs.includes(card.id);
            return (
              <div 
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className={`aspect-square flex items-center justify-center rounded-lg transition-all duration-300 cursor-pointer ${
                  isFlipped 
                    ? "bg-white shadow-md transform rotate-y-180" 
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                {isFlipped ? (
                  <div className="text-center p-2">
                    <div className="w-full h-16 bg-gray-200 mb-2 flex items-center justify-center">
                      <span className="text-xs text-gray-500">Image produit</span>
                    </div>
                    <p className="text-sm font-medium">{card.name}</p>
                  </div>
                ) : (
                  <span className="text-2xl text-white">?</span>
                )}
              </div>
            );
          })}
        </div>
      )}
      
      <div className="mt-4 text-sm text-gray-600">
        <p>Retrouvez les paires de produits identiques! Un bon score pourrait vous offrir une réduction sur votre prochain achat.</p>
      </div>
    </div>
  );
}