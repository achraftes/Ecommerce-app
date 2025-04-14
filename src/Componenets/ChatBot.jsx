// ChatBot.jsx
import './ChatBot.css';
import { useState } from 'react';

function ChatBot({ showChat, setShowChat }) {
    const [messages, setMessages] = useState([]);
    const [userMessage, setUserMessage] = useState('');

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!userMessage.trim()) return;

        const userMsg = { sender: 'user', text: userMessage };
        setMessages(prev => [...prev, userMsg]);

        setTimeout(() => {
            const botMsg = {
                sender: 'bot',
                text: `Je suis un robot. Tu as dit : "${userMessage}"`,
            };
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
