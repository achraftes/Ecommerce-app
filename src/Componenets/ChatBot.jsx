// ChatBot.jsx
import './ChatBot.css';
import { useState } from 'react';

function ChatBot({ showChat, setShowChat }) {
    const [messages, setMessages] = useState([]);
    const [userMessage, setUserMessage] = useState('');
    const [step, setStep] = useState(0); // Pour suivre l'étape du dialogue

    // Fonction pour gérer l'envoi du message
    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!userMessage.trim()) return;

        const userMsg = { sender: 'user', text: userMessage };
        setMessages(prev => [...prev, userMsg]);

        // Réponse du bot en fonction de l'étape du dialogue
        setTimeout(() => {
            let botMsg = { sender: 'bot', text: '' };

            if (step === 0) {
                botMsg.text = "Bonjour ! Que puis-je vous aider à trouver aujourd'hui ?";
                setStep(1);
            } else if (step === 1) {
                botMsg.text = "Super, vous cherchez un produit spécifique ou vous avez besoin d'aide pour choisir ?";
                setStep(2);
            } else if (step === 2) {
                botMsg.text = "D'accord, je vous aide à trouver le produit. Est-ce un produit électronique, un vêtement, ou autre chose ?";
                setStep(3);
            } else if (step === 3) {
                botMsg.text = `Merci pour votre réponse ! Je vais chercher des ${userMessage}. Est-ce que vous voulez que je filtre par prix ou marque ?`;
                setStep(4);
            } else {
                botMsg.text = "Merci d'avoir utilisé notre assistant ! Si vous avez d'autres questions, n'hésitez pas à demander.";
                setStep(0); // Réinitialiser le chatbot
            }

            setMessages(prev => [...prev, botMsg]);
        }, 500);

        setUserMessage('');
    };

    if (!showChat) return null;

    return (
        <div className="chatbot-window">
            <div className="chatbot-header">
                <strong>Assistant Virtuel</strong>
                <button onClick={() => setShowChat(false)} className="close-btn">X</button>
            </div>
            <div className="chatbot-body">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`message ${msg.sender}`}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <form className="chatbot-input" onSubmit={handleSendMessage}>
                <input
                    type="text"
                    placeholder="Écrivez un message..."
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                />
                <button type="submit">Envoyer</button>
            </form>
        </div>
    );
}

export default ChatBot;
