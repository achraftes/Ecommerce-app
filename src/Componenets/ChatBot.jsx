import './ChatBot.css';
import { useState, useEffect, useRef } from 'react';

function ChatBot({ showChat, setShowChat }) {
    const [messages, setMessages] = useState([]);
    const [userMessage, setUserMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    // Auto-scroll to bottom of messages
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // Initialize chat with a welcome message
    useEffect(() => {
        if (messages.length === 0) {
            setMessages([
                { 
                    sender: 'bot', 
                    text: "Bonjour ! Je suis votre assistant virtuel. Je peux vous aider avec n'importe quelle question. Comment puis-je vous aider aujourd'hui ?" 
                }
            ]);
        }
    }, [messages]);

    // Generate a chat response based on the input message
    const generateResponse = (input) => {
        // Simple keyword-based responses
        const inputLower = input.toLowerCase();
        
        if (inputLower.includes('bonjour') || inputLower.includes('salut') || inputLower.includes('hello')) {
            return "Bonjour ! Comment puis-je vous aider aujourd'hui ?";
        } else if (inputLower.includes('merci')) {
            return "Avec plaisir ! Y a-t-il autre chose dont vous avez besoin ?";
        } else if (inputLower.includes('produit') || inputLower.includes('acheter') || inputLower.includes('trouver')) {
            return "Je peux vous aider à trouver des produits. Quelle catégorie vous intéresse ? Électronique, vêtements, maison ou autres ?";
        } else if (inputLower.includes('électronique')) {
            return "Dans notre section électronique, nous avons des smartphones, ordinateurs, tablettes, et accessoires. Quel type de produit électronique recherchez-vous ?";
        } else if (inputLower.includes('vêtement')) {
            return "Dans notre section vêtements, nous avons des collections pour hommes, femmes et enfants. Quelle catégorie vous intéresse ?";
        } else if (inputLower.includes('prix') || inputLower.includes('coût')) {
            return "Nos produits sont disponibles dans différentes gammes de prix. Avez-vous un budget spécifique en tête ?";
        } else if (inputLower.includes('livraison')) {
            return "Nous offrons la livraison gratuite pour les commandes de plus de 50€. La livraison standard prend 3-5 jours ouvrables.";
        } else if (inputLower.includes('paiement')) {
            return "Nous acceptons les cartes de crédit, PayPal, et les virements bancaires comme modes de paiement.";
        } else if (inputLower.includes('retour') || inputLower.includes('remboursement')) {
            return "Notre politique de retour permet un remboursement complet dans les 30 jours suivant l'achat, à condition que le produit soit en parfait état.";
        } else if (inputLower.includes('au revoir') || inputLower.includes('bye')) {
            return "Merci d'avoir discuté avec moi ! N'hésitez pas à revenir si vous avez d'autres questions.";
        } else if (inputLower.includes('aide') || inputLower.includes('besoin')) {
            return "Je suis là pour vous aider ! Dites-moi simplement ce dont vous avez besoin ou quelle information vous recherchez.";
        } else if (inputLower.includes('comment')) {
            return "Pour vous aider de manière plus précise, pourriez-vous me donner plus de détails sur ce que vous cherchez à faire ?";
        } else {
            // Réponse générique pour les cas non couverts
            return "Merci pour votre message. Pour mieux vous aider, pourriez-vous préciser votre demande ou me poser une question plus spécifique ?";
        }
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!userMessage.trim()) return;

        const userMsg = { sender: 'user', text: userMessage };
        setMessages(prev => [...prev, userMsg]);
        setUserMessage('');
        setIsLoading(true);

        // Simuler un délai de réponse pour plus de réalisme
        setTimeout(() => {
            const botResponse = generateResponse(userMsg.text);
            const botMsg = { sender: 'bot', text: botResponse };
            setMessages(prev => [...prev, botMsg]);
            setIsLoading(false);
        }, 800);
    };

    if (!showChat) return null;

    return (
        <div className="chatbot-window">
            <div className="chatbot-header">
                <strong>Assistant Virtuel</strong>
                <button onClick={() => setShowChat(false)} className="close-btn">×</button>
            </div>
            <div className="chatbot-body">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`message ${msg.sender}`}>
                        {msg.text}
                    </div>
                ))}
                {isLoading && (
                    <div className="message bot typing">
                        <div className="typing-indicator">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
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