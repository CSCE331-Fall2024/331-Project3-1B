import React, { useState, useContext, useEffect } from "react";
import { translateText } from "./translate.js"; // The utility function created earlier
import { languageContext } from "./languageContext.jsx";
import { useLocation } from "react-router-dom";
import "./googleTranslate.css";

export default function googleTranslate() {
    const [isTranslating, setIsTranslating] = useState(false);
    const location = useLocation();
    const top_languages = {
        English: "en",
        "Chinese (Simplified)": "zh",
        Spanish: "es",
        Hindi: "hi",
        Arabic: "ar",
        Bengali: "bn",
        Portuguese: "pt",
        Russian: "ru",
        Japanese: "ja",
        German: "de",
    };
    

    const { language, changeLanguage } = useContext(languageContext);

    

    const handleLanguageChange = (e) => {
        const newLanguage = e.target.value;
        changeLanguage(newLanguage); // Update the context and local storage
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


    useEffect(() => {
        const persistedLanguage = localStorage.getItem("selectedLanguage") || "en";
    
        if (persistedLanguage !== "en") {
            changeLanguage(persistedLanguage); // Update context state to match persisted language
            translatePage(persistedLanguage); // Translate the page
        }
    }, []); // Runs only once on mount

    useEffect(() => {
        if (language !== "en") {
            translatePage(language);
        }
    }, [location]); // Runs whenever the location changes
    

    return (
        <div  className="notranslate translate-container">
            <select
                id="language-selector"
                value={language}
                onChange={(e) => changeLanguage(e.target.value)}
                className="notranslate"
            >
                {Object.keys(top_languages).map((lang) => (
                    <option
                        key={top_languages[lang]}
                        value={top_languages[lang]}
                        className="notranslate"
                    >
                        {lang}
                    </option>
                ))}
            </select>
            <button
                onClick={translatePage}
                disabled={isTranslating}
                className="notranslate"
            >
                {isTranslating ? "Translating..." : "Translate"}
            </button>
            <button
                onClick={() => {
                    const textNodes = collectTextNodes();
                    textNodes.forEach((node) => {
                        node.nodeValue = node.originalText; // Reset to original English text
                    });
                    changeLanguage("en");
                }}
                className="notranslate"
            >
                Reset
            </button>
        </div>
    );
}
