// ChatButtonFloating.jsx - Nouveau composant pour le bouton flottant
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import ChatBot from './ChatBot';
import './ChatButtonFloating.css'; // Nous créerons ce fichier CSS

function ChatButtonFloating() {
    const [showChat, setShowChat] = useState(false);

    return (
        <>
            {/* Bouton flottant */}
            <div className="chat-button-floating" onClick={() => setShowChat(!showChat)}>
                <div className="chat-icon-container">
                    <FontAwesomeIcon icon={faComments} className="chat-icon" />
                </div>
                <div className="chat-text">
                    <div className="chat-question">Have a requirement?</div>
                    <div className="chat-cta">Chat with us</div>
                </div>
            </div>

            {/* Composant de chat */}
            <ChatBot showChat={showChat} setShowChat={setShowChat} />
        </>
    );
}

export default ChatButtonFloating;