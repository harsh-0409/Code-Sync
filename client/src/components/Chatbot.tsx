import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './Chatbot.css'; // Ensure the updated CSS file is imported

const Chatbot = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<{ user: string; bot: string }[]>([]);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = input.trim();
        setMessages((prev) => [...prev, { user: userMessage, bot: '' }]);
        setInput('');

        try {
            const response = await axios.post('http://localhost:5000/chat', {
                message: userMessage,
            });

            const botMessage = response.data.response || "Sorry, I didn't understand that.";
            setMessages((prev) => {
                const updatedMessages = [...prev];
                updatedMessages[updatedMessages.length - 1].bot = botMessage;
                return updatedMessages;
            });
        } catch (error) {
            console.error('Error fetching response:', error);
            setMessages((prev) => {
                const updatedMessages = [...prev];
                updatedMessages[updatedMessages.length - 1].bot =
                    'An error occurred. Please try again.';
                return updatedMessages;
            });
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className="chatbot">
            <div className="chat-window">
                <div className="messages">
                    {messages.map((msg, index) => (
                        <div key={index} className="message">
                            <div className="user-message">
                                <strong>You:</strong> {msg.user}
                            </div>
                            <div className="bot-message">
                                <strong>Bot:</strong> {msg.bot}
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            </div>
            <form onSubmit={handleSend} className="input-area">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="input-box"
                />
                <button type="submit" className="send-button">
                    Send
                </button>
            </form>
        </div>
    );
};

export default Chatbot;
