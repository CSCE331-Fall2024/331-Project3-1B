import React, { useState } from "react";
import { translateText } from "./translate.js"; // The utility function created earlier
import "./googleTranslate.css";

export default function googleTranslate() {
    const [language, setLanguage] = useState("es"); // Default target language is Spanish
    const [isTranslating, setIsTranslating] = useState(false);
    const top_languages = {
        "Chinese (Simplified)": "zh",
        Spanish: "es",
        English: "en",
        Hindi: "hi",
        Arabic: "ar",
        Bengali: "bn",
        Portuguese: "pt",
        Russian: "ru",
        Japanese: "ja",
        German: "de",
    };

    
    const collectTextNodes = () => {
        const textNodes = [];
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: (node) => {
                    // Exclude text nodes inside elements with the `notranslate` class
                    if (
                        node.parentElement &&
                        node.parentElement.classList.contains("notranslate")
                    ) {
                        return NodeFilter.FILTER_REJECT;
                    }
                    return NodeFilter.FILTER_ACCEPT;
                },
            },
            false
        );

        let node;
        while ((node = walker.nextNode())) {
            if (node.nodeValue.trim()) {
                // Capture original text the first time
                if (!node.originalText) {
                    node.originalText = node.nodeValue.trim(); // Store original text
                }
                textNodes.push(node);
            }
        }

        return textNodes;
    };

    const translatePage = async () => {
        setIsTranslating(true);

        // Collect all text nodes
        const textNodes = collectTextNodes();

        // Use the original text for translation
        const originalTexts = textNodes.map((node) => node.originalText);

        // Call the translation API
        const translatedTexts = await translateText(originalTexts, language);

        if (translatedTexts.length) {
            textNodes.forEach((node, index) => {
                node.nodeValue = translatedTexts[index]; // Update text node with translation
            });
        }

        setIsTranslating(false);
    };

    return (
        <div style={{ margin: "10px 0" }} className="notranslate">
            <label htmlFor="language-selector" className="notranslate">
                Translate to:{" "}
            </label>
            <select
                id="language-selector"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="notranslate"
            >
                {Object.keys(top_languages).map((language) => (
                    <option
                        key={top_languages[language]}
                        value={top_languages[language]}
                        className="notranslate"
                    >
                        {language}
                    </option>
                ))}
            </select>
            <button
                onClick={translatePage}
                disabled={isTranslating}
                className="notranslate"
            >
                {isTranslating ? "Translating..." : "Translate Page"}
            </button>
            <button
                onClick={() => {
                    const textNodes = collectTextNodes();
                    textNodes.forEach((node) => {
                        node.nodeValue = node.originalText; // Reset to original English text
                    });
                }}
                className="notranslate"
            >
                Reset to English
            </button>
        </div>
    );
}
