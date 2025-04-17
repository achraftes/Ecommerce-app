import React, { useState, useEffect } from 'react';

const words = [
  'javascript',
  'react',
  'python',
  'html',
  'css',
  'node',
  'express',
  'typescript'
];

function WordScramble() {
  const [scrambledWord, setScrambledWord] = useState('');
  const [originalWord, setOriginalWord] = useState('');
  const [userInput, setUserInput] = useState('');
  const [message, setMessage] = useState('');
  const [attempts, setAttempts] = useState(0);

  // Fonction pour choisir un nouveau mot aléatoire
  const selectNewWord = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setOriginalWord(randomWord);
    setScrambledWord(randomWord.split('').sort(() => Math.random() - 0.5).join(''));
    setUserInput('');
    setMessage('');
    setAttempts(0); // Réinitialiser les tentatives
  };

  // Utilisation de useEffect pour sélectionner le premier mot
  useEffect(() => {
    selectNewWord();
  }, []);

  // Gérer le changement dans l'input de l'utilisateur
  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  // Gérer la soumission de la réponse
  const handleSubmit = () => {
    if (userInput.toLowerCase() === originalWord.toLowerCase()) {
      setMessage('Bravo, vous avez trouvé le mot!');
      setTimeout(selectNewWord, 1500); // Sélectionne un nouveau mot après 1.5 seconde
    } else {
      setMessage('Essayez encore!');
      setAttempts((prev) => prev + 1); // Incrémente les tentatives
    }
  };

  return (
    <div className="game-container">
      <h2>Jeu des mots mélangés</h2>
      <p>Essayez de trouver le mot caché!</p>
      <h3>Mot mélangé: {scrambledWord}</h3>
      
      <input
        type="text"
        value={userInput}
        onChange={handleInputChange}
        placeholder="Entrez votre réponse"
        className="form-control mb-3" // Ajout de Bootstrap ou de votre propre style
      />
      
      <button 
        onClick={handleSubmit} 
        className="btn btn-primary mb-3"
      >
        Valider
      </button>
      
      <p>{message}</p>
      <p>Nombre de tentatives: {attempts}</p>
      
      <button 
        onClick={selectNewWord} 
        className="btn btn-secondary"
      >
        Nouveau mot
      </button>
    </div>
  );
}

export default WordScramble;
