const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs/promises");
require("dotenv").config(); // Load environment variables

const { ChatGroq } = require("@langchain/groq");


const router = express();
router.use(cors());
router.use(express.json());

// Initialize the Groq model
const llm = new ChatGroq({
    model: "llama-3.1-70b-versatile", // Groq model name
    temperature: 0.3, // Set temperature for deterministic responses
    apiKey: process.env.CHATBOT_API_KEY, // Load Groq API key from environment
});

// Load the Panda Express information at server startup
let pandaText = "";
(async () => {
    try {
        const filePath = path.join(__dirname, "context.txt");
        pandaText = await fs.readFile(filePath, "utf-8");
        console.log(pandaText);
        console.log("File content loaded successfully!");
    } catch (error) {
        console.error("Error loading text file:", error);
    }
})();

router.post("/chat", async (req, res) => {
    const query = req.body.query;
    console.log("Received query:", query);


    if (!query) {
        return res.status(400).json({ reply: "Please provide a query." });
    }

    try {
        // Prepare the messages array in the required format
        const messages = [
            {
                role: "system",
                content:
                    "You are a helpful assistant for Panda Express customers.",
            },
            { role: "assistant", content: pandaText }, // Inject the context
            { role: "user", content: query }, // User's question
        ];



        // Call the Groq model using LangChain
        const response = await llm.invoke(messages);

        // Respond with the generated text
        res.json({ reply: response.content });
    } catch (error) {
        console.error("Error processing the query with Groq:", error);
        res.status(500).json({
            reply: "Something went wrong while processing your query.",
        });
    }
});

// Example route to check if the server is running
router.get("/chatbot-test", (req, res) => {
    res.send("Chatbot backend with Groq is running.");
});

module.exports = router;
