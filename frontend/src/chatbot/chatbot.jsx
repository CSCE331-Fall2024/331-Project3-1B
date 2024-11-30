import React, { useState } from "react";

import "./chatbot.css";

const Chatbot = () => {
    // State to manage the messages in the chat
    const [messages, setMessages] = useState([]);

    // State to manage the user's input in the chat
    const [input, setInput] = useState("");

    // State to control whether the chatbot interface is visible
    const [showChatbot, setShowChatbot] = useState(false);

    /**
     * Sends a message to the chatbot and updates the conversation.
     * - Sends the user's input to the backend API.
     * - Receives and displays the bot's response.
     */
    const sendMessage = async () => {
        // Prevent sending empty messages
        if (!input.trim()) return;

        // Add the user's message to the chat history
        const userMessage = { sender: "user", text: input };
        setMessages((prev) => [...prev, userMessage]);

        try {
            // Send the user's message to the backend API
            const response = await fetch("http://localhost:3000/chat/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query: input }),
            });

            // Parse the API's response
            const data = await response.json();

            // Add the bot's response to the chat history
            const botMessage = { sender: "bot", text: data.reply };
            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            // Handle errors, such as network issues
            console.error("Error communicating with the chatbot:", error);

            // Display an error message in the chat
            const errorMessage = {
                sender: "bot",
                text: "Sorry, something went wrong. Please try again later.",
            };
            setMessages((prev) => [...prev, errorMessage]);
        }

        // Clear the input field
        setInput("");
    };

    return (
        <>
            {/* Button to toggle the chatbot visibility */}
            <button
                onClick={() => setShowChatbot(!showChatbot)}
                className="chatbot-button"
            >
                <i className="fa-solid fa-comments icon-size" />
            </button>

            {/* Chatbot interface */}
            {showChatbot && (
                <div className="chatbot-container">
                    {/* Chatbot header with close button */}
                    <div className="header-container">
                        <h1 className="chatbot-header">PandaBot</h1>
                        <button
                            onClick={() => setShowChatbot(!showChatbot)}
                            className="close-chatbot"
                        >
                            X
                        </button>
                    </div>

                    {/* Chat display area */}
                    <div className="chatbox">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`message ${msg.sender}`} // Add classes based on the sender
                            >
                                <pre className="text-message-container">{msg.text}</pre>
                            </div>
                        ))}
                    </div>

                    {/* Input area for the user to type messages */}
                    <div className="input-container">
                        <input
                            className="input"
                            type="text"
                            value={input} // Controlled input bound to state
                            onChange={(e) => setInput(e.target.value)} // Update state on input change
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
