import { useState, useEffect } from 'react';

const words = [
  { word: "JAVASCRIPT", hint: "Un langage de programmation populaire" },
  { word: "ORDINATEUR", hint: "Machine électronique pour traiter l'information" },
  { word: "DEVELOPPEUR", hint: "Personne qui crée des logiciels" },
  { word: "PROGRAMME", hint: "Ensemble d'instructions pour un ordinateur" },
  { word: "INTERNET", hint: "Réseau mondial de communication" },
  { word: "ALGORITHME", hint: "Suite d'opérations pour résoudre un problème" }
];

export default function WordScramble() {
  const [currentWord, setCurrentWord] = useState("");
  const [scrambledWord, setScrambledWord] = useState("");
  const [hint, setHint] = useState("");
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | null>(null);

  const scrambleWord = (word: string) => {
    return word
      .split('')
      .sort(() => Math.random() - 0.5)
      .join('');
  };

  const selectNewWord = () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    const selected = words[randomIndex];
    setCurrentWord(selected.word);
    setHint(selected.hint);
    setScrambledWord(scrambleWord(selected.word));
    setUserInput("");
    setMessage("");
    setMessageType(null);
  };

  useEffect(() => {
    selectNewWord();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (userInput.toUpperCase() === currentWord) {
      setScore(score + 1);
      setMessage("Correct! Bien joué!");
      setMessageType("success");
      setTimeout(selectNewWord, 1500);
    } else {
      setMessage("Incorrect, essayez encore!");
      setMessageType("error");
    }
  };

  const handleSkip = () => {
    setMessage(`Le mot était: ${currentWord}`);
    setMessageType("error");
    setTimeout(selectNewWord, 1500);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Mots Mélangés</h2>
        <p className="text-gray-600">Score: {score}</p>
      </div>

      <div className="text-center mb-8">
        <div className="text-4xl font-bold text-blue-600 mb-4">{scrambledWord}</div>
        <div className="text-gray-600 italic">Indice: {hint}</div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value.toUpperCase())}
            placeholder="Entrez votre réponse..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Vérifier
          </button>
          <button
            type="button"
            onClick={handleSkip}
            className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Passer
          </button>
        </div>
      </form>

      {message && (
        <div
          className={`mt-4 p-4 rounded-lg text-center ${
            messageType === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {message}
        </div>
      )}

      <div className="mt-8 text-gray-600 text-sm text-center">
        <p>Devinez le mot correct à partir des lettres mélangées. Utilisez l'indice si vous êtes bloqué!</p>
      </div>
    </div>
  );
}