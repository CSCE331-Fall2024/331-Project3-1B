import React, { useState } from "react";

const Chatbot = () => {
    const [messages, setMessages] = useState([]); // Chat history
    const [input, setInput] = useState(""); // User input

    // Send a message to the chatbot
    const sendMessage = async () => {
        if (!input.trim()) return;

        // Display the user's message in the chat
        const userMessage = { sender: "user", text: input };
        setMessages((prev) => [...prev, userMessage]);

        try {
            // Send the input to the backend using fetch
            const response = await fetch("http://localhost:3000/chat/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ query: input }),
            });

            if (!response.ok) {
                throw new Error("Failed to communicate with the server.");
            }

            const data = await response.json();

            // Display the chatbot's response
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

        // Clear the input field
        setInput("");
    };

    return (
        <div style={styles.container}>
            <h1>Panda Express Chatbot</h1>
            <div style={styles.chatbox}>
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        style={{
                            ...styles.message,
                            alignSelf:
                                msg.sender === "user"
                                    ? "flex-end"
                                    : "flex-start",
                            backgroundColor:
                                msg.sender === "user" ? "#d1e7dd" : "#f8d7da",
                        }}
                    >
                        {msg.text}
                    </div>
                ))}
            </div>
            <div style={styles.inputContainer}>
                <input
                    style={styles.input}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me about Panda Express..."
                />
                <button style={styles.button} onClick={sendMessage}>
                    Send
                </button>
            </div>
        </div>
    );
};

// Basic inline styles
const styles = {
    container: {
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
        margin: "20px auto",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    },
    chatbox: {
        display: "flex",
        flexDirection: "column",
        height: "400px",
        overflowY: "auto",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        backgroundColor: "#f9f9f9",
    },
    message: {
        margin: "5px",
        padding: "10px",
        borderRadius: "5px",
        maxWidth: "70%",
        wordBreak: "break-word",
    },
    inputContainer: {
        display: "flex",
        marginTop: "10px",
    },
    input: {
        flex: 1,
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "5px 0 0 5px",
    },
    button: {
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "0 5px 5px 0",
        backgroundColor: "#007bff",
        color: "#fff",
        cursor: "pointer",
    },
};

export default Chatbot;
