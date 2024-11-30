const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs/promises");
require("dotenv").config(); // Load environment variables from a .env file

const { ChatGroq } = require("@langchain/groq"); // Import the ChatGroq class from LangChain

const router = express();
router.use(cors()); // Enable Cross-Origin Resource Sharing (CORS) for the server
router.use(express.json()); // Middleware to parse JSON bodies in requests

// Initialize the ChatGroq LLM with configuration options
const llm = new ChatGroq({
    model: "llama-3.1-70b-versatile", // Specify the model to use
    temperature: 0.3, // Set the response temperature for deterministic results
    apiKey: process.env.CHATBOT_API_KEY, // Load the API key for authentication
    maxTokens: 75, // Limit the number of tokens in the response
});

// Load the Panda Express contextual information at server startup
let pandaText = ""; // Variable to hold the preloaded context
(async () => {
    try {
        // Define the path to the context file
        const filePath = path.join(__dirname, "context.txt");

        // Read the context file asynchronously and store its content
        pandaText = await fs.readFile(filePath, "utf-8");
        console.log("File content loaded successfully!");
    } catch (error) {
        // Log an error if the file could not be read
        console.error("Error loading text file:", error);
    }
})();

// Define the POST route for handling chat queries
router.post("/chat", async (req, res) => {
    const query = req.body.query; // Extract the user's query from the request body

    // If no query is provided, return a 400 Bad Request response
    if (!query) {
        return res.status(400).json({ reply: "Please provide a question." });
    }

    try {
        // Prepare the messages array in the required format for the LLM
        const messages = [
            {
                role: "system",
                content:
                    "You are a helpful assistant for Panda Express customers. Do not ask follow-up questions. Only answer questions that are related to Panda Express.",
            },
            { role: "assistant", content: pandaText }, // Inject the preloaded context
            { role: "user", content: query }, // Include the user's query
        ];

        // Invoke the LLM with the messages array
        const response = await llm.invoke(messages);

        // Respond to the user with the generated reply
        res.json({ reply: response.content });
    } catch (error) {
        // Log any errors that occur during LLM invocation
        console.error("Error processing the query with Groq:", error);

        // Return a 500 Internal Server Error response
        res.status(500).json({
            reply: "Something went wrong while processing your query.",
        });
    }
});

// Export the router for use in other parts of the application
module.exports = router;

