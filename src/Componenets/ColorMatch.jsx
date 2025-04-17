import { useState, useEffect } from 'react';

const COLORS = [
  { name: 'ROUGE', color: 'bg-red-500' },
  { name: 'BLEU', color: 'bg-blue-500' },
  { name: 'VERT', color: 'bg-green-500' },
  { name: 'JAUNE', color: 'bg-yellow-500' },
  { name: 'VIOLET', color: 'bg-purple-500' },
  { name: 'ORANGE', color: 'bg-orange-500' }
];

export default function ColorMatch() {
  const [targetColor, setTargetColor] = useState<typeof COLORS[0] | null>(null);
  const [options, setOptions] = useState<typeof COLORS>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const shuffleColors = () => {
    const shuffled = [...COLORS].sort(() => Math.random() - 0.5);
    const target = shuffled[0];
    const displayOptions = shuffled.slice(0, 4);
    setTargetColor(target);
    setOptions(displayOptions.sort(() => Math.random() - 0.5));
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setGameOver(false);
    setIsPlaying(true);
    shuffleColors();
  };

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameOver(true);
          setIsPlaying(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying]);

  const handleColorClick = (color: typeof COLORS[0]) => {
    if (!isPlaying) return;

    if (color.name === targetColor?.name) {
      setScore((prev) => prev + 1);
      shuffleColors();
    } else {
      setScore((prev) => Math.max(0, prev - 1));
    }
  };

  if (!isPlaying || gameOver) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Match de Couleurs</h2>
        
        {gameOver && (
          <div className="mb-8">
            <p className="text-2xl font-bold text-gray-700 mb-2">Score Final: {score}</p>
            <p className="text-gray-600">Bien joué! Voulez-vous réessayer?</p>
          </div>
        )}

        <button
          onClick={startGame}
          className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          {gameOver ? 'Rejouer' : 'Commencer'}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div className="text-2xl font-bold text-gray-800">Score: {score}</div>
        <div className="text-xl font-semibold text-gray-600">Temps: {timeLeft}s</div>
      </div>

      <div className="text-center mb-8">
        <p className="text-lg mb-2">Cliquez sur la couleur qui correspond au mot:</p>
        <h2 className="text-4xl font-bold mb-8">{targetColor?.name}</h2>

        <div className="grid grid-cols-2 gap-4">
          {options.map((color, index) => (
            <button
              key={index}
              onClick={() => handleColorClick(color)}
              className={`${color.color} h-24 rounded-lg hover:opacity-90 transition-opacity transform hover:scale-105 duration-200`}
            />
          ))}
        </div>
      </div>

      <div className="text-gray-600 text-sm text-center">
        <p>Associez rapidement les couleurs avec leurs noms pour marquer des points!</p>
      </div>
    </div>
  );
}