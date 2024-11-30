import React, { useState } from "react";

import "./chatbot.css";

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [showChatbot, setShowChatbot] = useState(false);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { sender: "user", text: input };
        setMessages((prev) => [...prev, userMessage]);

        try {
            const response = await fetch("http://localhost:3000/chat/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query: input }),
            });

            const data = await response.json();
            const botMessage = { sender: "bot", text: data.reply };
            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error("Error communicating with the chatbot:", error);
            const errorMessage = {
                sender: "bot",
                text: "Sorry, something went wrong. Please try again later.",
            };
            setMessages((prev) => [...prev, errorMessage]);
        }

        setInput("");
    };

    return (
        <>
            <button
                onClick={() => setShowChatbot(!showChatbot)}
                className="chatbot-button"
            >
                <i className="fa-solid fa-comments icon-size" />
            </button>

            {showChatbot && (
                <div className="chatbot-container">
                    <div className="header-container">
                        <h1 className="chatbot-header">PandaBot</h1>
                        <button onClick={() => setShowChatbot(!showChatbot)} className="close-chatbot">X</button>
                    </div>
                    <div className="chatbox">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`message ${msg.sender}`}
                            >
                                {msg.text}
                            </div>
                        ))}
                    </div>
                    <div className="input-container">
                        <input
                            className="input"
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask me about Panda Express..."
                        />
                        <button className="button" onClick={sendMessage}>
                            Send
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Chatbot;
